import requests
import json

#Native Lands
def fetch_nativelands():
    print('Fetching Native Land territory data...')

    nl_link = 'https://native-land.ca/coordinates/indigenousTerritories.json'
    geoJSON = requests.get(nl_link).json()

    f = open('nativelands/indigenousTerritories.geojson', 'w+')
    f.write(json.dumps(geoJSON))
    f.close()
    print('Fetching Native Land territory data complete!')

#College data
def fetch_colleges():
    print('Fetching College data...')
    print('WARNING: not fetching the direct URL, not easily publically available.')
    print('View the README for details.')
    print('Fetching College data complete!')

def fetch():
    fetch_nativelands()
    fetch_colleges()

def main():
    fetch()

if __name__ == '__main__':
    main()
