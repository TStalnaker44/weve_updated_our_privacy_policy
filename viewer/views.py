from django.shortcuts import render
from django.http import HttpResponse
from django.template import loader

from .models import Sites
from .models import PolicySnapshots

import markdown

def index(request):
    fb_domain = Sites.objects.get(id=38056)

    #Get all snapshots with domain id 38056 (facebook.com as defined in Sites table), order them by year (descending) then phase (descending)
    fb_snapshots = PolicySnapshots.objects.filter(site=38056).order_by('-year', '-phase') 

    #Pick the first snapshot in the list, i.e. the most recent one, and get its policy text (in markdown)
    snapshot = fb_snapshots[0]
    policy_text_raw = snapshot.policy_text.policy_text

    #Convert the markdown text to html
    policy_text_html = markdown.markdown(policy_text_raw)

    template = loader.get_template('viewer/index.html')
    context = {
        'fb_domain': fb_domain,
        'policy_text_html': policy_text_html
    }
    return HttpResponse(template.render(context, request))
    #return render(request, "index.html")