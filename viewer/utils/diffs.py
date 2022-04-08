
import difflib

with open("facebook_2.html", encoding="utf-8") as file_1:
    policy_1 = file_1.read().split()

with open("facebook_test.html", encoding="utf-8") as file_2:
    policy_2 = file_2.read().split()

# for line in difflib.unified_diff(policy_1, policy_2, fromfile='file1', tofile='file2', lineterm=''):
#     print(line)

## Modified from
## https://stackoverflow.com/questions/39001097/match-changes-by-words-not-by-characters
# s = difflib.SequenceMatcher(None, policy_1, policy_2)
# content = []
# for code, i1, i2, j1, j2 in s.get_opcodes():
#     if code == "insert":
#         content.append("<span class='addition'>")
#         content.extend(policy_2[j1:j2])
#         content.append("</span>")
#     elif code == "delete":
#         content.append("<span class='deletion'>")
#         content.extend(policy_2[j1:j2])
#         content.append("</span>")
#     elif code == "replace":
#         content.append("<span class='replacement'>")
#         content.extend(policy_2[j1:j2])
#         content.append("</span>")
#     else:
#         content.extend(policy_2[j1:j2])

# with open("facebookAdditions.html", "w", encoding="utf-8") as file:
#     file.write(" ".join(content))
#     file.flush()

import string
def removePunc(s):
    return "".join([c for c in s if c not in string.punctuation])

def getDiff(seq1, seq2):
    seq1 = seq1.lower().split()
    seq2 = seq2.lower().split()
    s = difflib.SequenceMatcher(lambda x: x in string.punctuation, seq1, seq2)
    print(f"Match Score: {s.ratio()*100:.2f}%")
    for code, i1, i2, j1, j2 in s.get_opcodes():
        print(code, seq1[i1:i2], seq2[j1:j2])

one   = "The apple is red"
two   = "The orange is red"
three = "The apple is really red"
four  = "apple red"
five = "There once was a man from Nantucket"
six  = "Once upon a time there was a man who lived in Nantucket"
seven = "You have it set to M for mini when you should have it set to W for wombo"
eight = "I think I see your problem.  You have it set to M for mini, when what you " + \
"really want to do is have it set to W for wombo.  It's first grade spongebob"

print("Comparison One:")
getDiff(one, two)
print("Comparison Two:")
getDiff(one, three)
print("Comparison Three:")
getDiff(one, four)
print("Comparison Four:")
getDiff(five, six)


