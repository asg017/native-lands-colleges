import requests
import json
import urllib


class CollegeScoreCard:
  
  def __init__(self, key=None, cache=None):
    if key is not None:
      self.key = key
    else:
      secrets = json.loads(open('secret.json').read())
      self.key  = secrets.get('CSC_API_KEY')
    if cache is not None:
      self.cache_file = cache
      try:
        f = open(self.cache_file, 'r')
        self.cache = json.loads( f.read() )
      except:
        self.cache = {}
      f.close()
    else:
        self.cache = None
        self.cache_file = None
    self.base = 'https://api.data.gov/ed/collegescorecard/v1/schools?'
    
  def get(self, name=None):
    if self.cache is not None and self.cache.get(name) is not None:
      return self.cache.get(name)
    if name is not None:
      params = {
        'api_key':self.key, 
        'school.name':name,
        '_fields': ('id,'
                    'school.name,school.alias,school.city,school.state,'
                    'school.school_url,school.main_campus,school.degrees_awarded.predominant,'
                    'school.degrees_awarded.highest,school.ownership,school.region_id,'
                    'school.locale,school.degree_urbanization,school.carnegie_basic,'
                    'school.carnegie_undergrad,school.carnegie_size_setting,'
                    'school.religious_affiliation,school.online_only,'
                    'location.lat,location.lon,'
                    #'cost.attendance.academic_year,cost.tuition.in_state,cost.tuition.out_of_state,'
                    '2015.student.size'),
        '_sort': '2015.student.size:desc&',
        '_per_page':'10'
        
      }
      r = requests.get(self.base, params=params)
      print(r.url)
      data = json.loads(r.text)
      if self.cache is not None:
        self.cache[name] = data
        f = open(self.cache_file, 'w+')
        f.write(json.dumps(self.cache))
        f.close()
      return data
    else:
      return 'ERROR'
  

def main():
  
  #d2 = na_colleges.get()
  csc = CollegeScoreCard()
  data= 'University of california San Diego'
  data = csc.get(name=data)
  print(data)
  
if __name__ == '__main__':
  main()
