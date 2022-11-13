import json


msg = input("Enter commit message: ")
# update package.json
with open("package.json", "r") as f:
    data = json.load(f)
    nver = int(str(data['version']).split('.')[2]) + 1
    data['version'] = data['version'][:-1] + str(nver)
    with open("package.json", "w") as w:
        json.dump(data, w, indent=4)

import os
os.system("git add .")
os.system("git commit -m " + r"\"" + msg + r"\"")
os.system("git push")
