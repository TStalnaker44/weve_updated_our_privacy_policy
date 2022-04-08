from django.shortcuts import render
from django.http import HttpResponse
from django.http import JsonResponse
from django.template import loader

from json import dumps

from .models import Sites
from .models import PolicySnapshots

from .forms import SnapshotForm

from .utils import policyExtractor

from sympy import re

import markdown

import logging

def policyHTML(request):
    logger = logging.getLogger()
    #logger.warning(request.GET)

    version = request.GET.get("version") or "2008A"
    changes = request.GET.get("changes") or "false"
    changes = True if changes.lower() == "true" else False
    domain = 'facebook.com'
    message = policyExtractor.getVersionHTML(domain, version, changes)
    return HttpResponse(message)

def index(request):

    logger = logging.getLogger()

    if request.headers.get('x-requested-with') == 'XMLHttpRequest':

        logger.warning("AJAX request")
        logger.warning(str(request.GET))

        data = {
            'snapshot': 'Dummy 1'
        }
        return JsonResponse(data)

    else:

        #domain = Sites.objects.get(id=38056)

        #Get all snapshots with domain id 38056 (facebook.com as defined in Sites table), order them by year (descending) then phase (descending)
        #snapshots = PolicySnapshots.objects.filter(site=38056).order_by('-year', '-phase') 

        #If the user requested a specific snapshot, get it
        #if "snapshot" in request.GET:
        #    snapshot = PolicySnapshots.objects.get(pk=request.GET["snapshot"])
        #Otherwise, pick the first snapshot in the list, i.e. the most recent one
        #else:
        #    snapshot = snapshots[0]
        #policy_text_raw = snapshot.policy_text.policy_text

        #kwargs = {'snapshot': [(i.id, str(i.year) + " " + str(i.phase)) for i in snapshots], 'selected': snapshot.id}
        #form = SnapshotForm(**kwargs)

        #Convert the markdown text to html
        #policy_text_html = markdown.markdown(policy_text_raw)

        company = request.GET.get("company") or "facebook.com"
        policyExtractor.setSite(company)

        stats = policyExtractor.getData()
        events = policyExtractor.getExampleEvents()

        initialPolicy = "2008A"
        data = {"stats":stats, "events":events, "initialPolicy":initialPolicy}
        dataJSON = dumps(data)

        template = loader.get_template('viewer/index.html')
        context = {
            'domain': company,
            #'form': form,
            #'policy_text_html': policy_text_html,
            'data': dataJSON,
        }
        return HttpResponse(template.render(context, request))
        #return render(request, "index.html")