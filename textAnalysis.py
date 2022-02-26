
"""
This file is meant as a sandbox to test the various 
text analysis tools at our disposal.
"""
import textstat, csv
from bs4 import BeautifulSoup

FIELDS = ["File","Version","Reading Time","Flesch Score","Smog Score","Readability","Lexicon Count","Sentence Count"]
FUNCS  = [(textstat.reading_time,{}),
            (textstat.flesch_reading_ease,{}),
            (textstat.smog_index,{}),
            (textstat.text_standard,{"float_output":False}),
            (textstat.lexicon_count,{"removepunct":True}),
            (textstat.sentence_count,{})]

def main():
    printStats("facebook_test.html")
    printStats("facebook_2.html")
    createCSV("facebook_test.html")

# Adapt this to iterate over all versions of a particular policy
def createCSV(fileName):

    with open(fileName, encoding="utf-8") as file:
        soup = BeautifulSoup(file, "html.parser")
    text = soup.get_text()

    row = [fileName,1]
    for f, kwargs in FUNCS:
        row.append(f(text,**kwargs))

    csvFileName = fileName.replace(".html",".csv")
    with open(csvFileName, 'w', newline='') as csvFile:
        writer = csv.writer(csvFile, delimiter=',', quotechar='|', quoting=csv.QUOTE_MINIMAL)
        writer.writerow(FIELDS)
        writer.writerow(row)



def printStats(fileName):
    with open(fileName, encoding="utf-8") as file:
        soup = BeautifulSoup(file, 'html.parser')

    text = soup.get_text()

    print("Facebook Privacy Policy Stats")
    print("Estimated Reading Time:", textstat.reading_time(text)/60)
    print("Flesch Reading Ease:", textstat.flesch_reading_ease(text))
    print("Flesch Kincaid Grade Level:",textstat.flesch_kincaid_grade(text))
    print("SMOG Reading Level:",textstat.smog_index(text))
    print("Estimated Readability", textstat.text_standard(text, float_output=False))
    print("Lexicon Count:", textstat.lexicon_count(text, removepunct=True))
    print("Sentence Count:", textstat.sentence_count(text))

if __name__ == "__main__":
    main()

