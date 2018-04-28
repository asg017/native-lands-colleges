from shapely.geometry import shape, Point
import json
import os

curdir = os.path.dirname(__file__)                                          
gj = json.load(open(os.path.join(curdir, '../input/nativelands/indigenousTerritories.geojson')))

territories = gj.get('features')
for t in territories:
    polygon = shape(t.get('geometry'))
