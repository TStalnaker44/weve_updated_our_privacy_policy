
"""
This file is meant as a sandbox to test the various 
text analysis tools at our disposal.
"""
import textstat
from bs4 import BeautifulSoup

def main():
    printStats("facebook_test.html")
    printStats("facebook_2.html")

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

