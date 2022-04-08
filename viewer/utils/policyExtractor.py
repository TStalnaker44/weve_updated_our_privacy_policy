import os, csv, markdown, textstat
from bs4 import BeautifulSoup
from unicodedata import category
from lxml.html.diff import htmldiff
from viewer.models import Sites, PolicySnapshots, PolicyTexts

htmls = {}
versions = []
site = ""


def setSite(domain):
    global site
    global htmls
    global versions
    if site != domain:
        htmls = {}
        versions = []
        site = domain
        getPolicies(domain)

def getPolicies(domainName):
    site = Sites.objects.get(domain=domainName)
    site_id = site.id
    policies = PolicySnapshots.objects.filter(site_id=site_id)
    for p in policies:
        text_stats = PolicyTexts.objects.get(id=p.policy_text_id)
        text = text_stats.policy_text
        html = markdown.markdown(text)
        version = str(p.year) + p.phase
        htmls[version] = html
        versions.append(version)
    versions.sort()

def getVersionHTML(domainName, version, changes):
    if version == None:
        version = versions[-1]
    if not changes:
        return htmls[version]
    else:
        i = versions.index(version)
        if i > 0:
            prevVersion = versions[i-1]
            return htmldiff(htmls[prevVersion], htmls[version])
        else:
            return htmls[version]

def getExampleEvents():
    return getExampleData("example_events.csv")

def getExampleData(fileName):
    path = os.path.join("temp_resources",fileName)
    with open(path, "r", encoding="utf-8") as file:
        lyst = []
        reader = csv.reader(file)
        fields = None
        for i, row in enumerate(reader):
            if i == 0:
                fields = row
            else:
                json = {}
                for j, c in enumerate(row):
                    if fields[j] == "image":
                        json[fields[j]] = "/static/img/" + c
                    else:
                        json[fields[j]] = c
                lyst.append(json)
    return lyst

def getData():
    data = []
    for v in versions:
        text = BeautifulSoup(htmls[v], "html.parser").get_text()
        json = {}
        json["Year"] = v[:-1]
        json["Phase"] = v[-1]
        json["ReadingTime"] = textstat.reading_time(text)
        json["FleschScore"] = max(textstat.flesch_reading_ease(text),0)
        json["SmogScore"] = textstat.smog_index(text)
        json["LexiconCount"] = textstat.lexicon_count(text, removepunct=True)
        json["SentenceCount"] = textstat.sentence_count(text)
        data.append(json)
    return data