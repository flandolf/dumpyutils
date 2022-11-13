import json
msg = input("Enter commit message: ")
# update package.json
with open("package.json", "r") as f:
    data = json.load(f)
    nver = int(str(data['version']).split('.')[2]) + 1
    if nver > 9:
        nver = 0
        mver = int(str(data['version']).split('.')[1]) + 1
        data['version'] = str(data['version']).split('.')[0] + "." + str(mver) + "." + str(nver)
    else:
        data['version'] = str(data['version']).split('.')[0] + "." + str(data['version']).split('.')[1] + "." + str(nver)
    with open("package.json", "w") as w:
        json.dump(data, w, indent=4)

import os
os.system("git add .")
os.system("git commit -m " + "\"" + msg + "\"")
os.system("git push")
