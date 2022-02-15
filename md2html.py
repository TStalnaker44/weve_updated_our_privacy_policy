
"""
This file converts markdown files (.md) into HTML.  This conversion
will be convenient when we want to display privacy policies in our
document viewer.  The HTML versions available on GitHub are not strictly
HTML, but rather include the javascript required to load the page.
That is that some of the html files appear to be proceedurally generated, 
which could present an issue in the future.

NOTE: In order to run this file, you will need to install the
markdown module by typing the following command into your terminal:

pip install markdown

https://www.digitalocean.com/community/tutorials/how-to-use-python-markdown-to-convert-markdown-text-to-html

"""

import markdown

fileName = "facebook_test"
with open(fileName + ".md", encoding="utf-8") as file:
    contents = file.read()
    html = markdown.markdown(contents)
with open(fileName + ".html", "w", encoding="utf-8") as file:
    file.write(html)
    file.flush()