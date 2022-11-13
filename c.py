import json
msg = input("Enter commit message: ")
# update package.json
with open("package.json", "r") as f:
    data = json.load(f)
    nver1 = int(data["version"].split(".")[0])
    nver2 = int(data["version"].split(".")[1])
    nver3 = int(data["version"].split(".")[2])
    if nver3 > 9:
        nver3 = 0
        nver2 += 1
    elif nver2 > 9:
        nver2 = 0
        nver1 += 1
    else:
        nver3 += 1
    nver = f"{nver1}.{nver2}.{nver3}"
    data["version"] = nver
    print('New version:', nver)
    with open("package.json", "w") as w:
        json.dump(data, w, indent=4)

import os
os.system("git add .")
os.system("git commit -m " + "\"" + msg + "\"")
os.system("git push")
