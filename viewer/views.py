from django.shortcuts import render
from django.http import HttpResponse
from django.http import JsonResponse
from django.template import loader

from .models import Sites
from .models import PolicySnapshots

from .forms import SnapshotForm

import markdown

import logging

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

        domain = Sites.objects.get(id=38056)

        #Get all snapshots with domain id 38056 (facebook.com as defined in Sites table), order them by year (descending) then phase (descending)
        snapshots = PolicySnapshots.objects.filter(site=38056).order_by('-year', '-phase') 

        #If the user requested a specific snapshot, get it
        if "snapshot" in request.GET:
            snapshot = PolicySnapshots.objects.get(pk=request.GET["snapshot"])
        #Otherwise, pick the first snapshot in the list, i.e. the most recent one
        else:
            snapshot = snapshots[0]
        policy_text_raw = snapshot.policy_text.policy_text

        kwargs = {'snapshot': [(i.id, str(i.year) + " " + str(i.phase)) for i in snapshots], 'selected': snapshot.id}
        form = SnapshotForm(**kwargs)

        #Convert the markdown text to html
        policy_text_html = markdown.markdown(policy_text_raw)

        template = loader.get_template('viewer/index.html')
        context = {
            'domain': domain,
            'form': form,
            'policy_text_html': policy_text_html
        }
        return HttpResponse(template.render(context, request))
        #return render(request, "index.html")