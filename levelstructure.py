import glob
import json

pathMainLevels = "C:\\Users\\Nico\\Documents\\code\\dc-im\\data\\level\\MainLevels\\**"
pathTransitions = "C:\\Users\\Nico\\Documents\\code\\dc-im\\data\\level\\Transition\\**"
pathResult = "C:\\Users\\Nico\\Documents\\code\\dc-im\\levels.json"

levels = []

for filename in glob.iglob(pathMainLevels):
    with open(filename, "r") as levelFile:
        data = json.load(levelFile)

        level = {
            "id": data["id"],
            "name": data["biome"],
            "exits": [{
                "name": "name", 
                "condition": "rune"
            }]
        }

        if("mobs" in data):
            level["mobs"]: data["mobs"]

        if "doubleUps" in data and data["doubleUps"] > 0 or "tripleUps" in data and data["tripleUps"] > 0:
            level["scrolls"] = 0

        if "doubleUps" in data and data["doubleUps"] > 0:
            level["scrolls"] += data["doubleUps"]

        if "tripleUps" in data and data["tripleUps"] > 0:
            level["scrolls"] += data["tripleUps"]


        levels.append(level)

with open(pathResult, "w+") as resultFile:
    json.dump(levels, resultFile, indent=4)