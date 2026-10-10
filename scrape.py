import urllib.request, json, urllib.parse

def search_wiki(query):
    url = 'https://en.wikipedia.org/w/api.php?action=query&generator=search&gsrsearch=' + urllib.parse.quote(query) + '&gsrnamespace=0&gsrlimit=5&prop=pageimages&pithumbsize=600&format=json'
    req = urllib.request.Request(url, headers={'User-Agent': 'Bot'})
    try:
        data = json.loads(urllib.request.urlopen(req).read())
        pages = data.get('query', {}).get('pages', {})
        for pid, p in pages.items():
            if 'thumbnail' in p:
                print(query + ": " + p['thumbnail']['source'])
    except Exception as e:
        print(e)

search_wiki('hand therapy')
search_wiki('sensory play child')
search_wiki('physical therapy rehabilitation')
search_wiki('pediatric occupational therapy')
search_wiki('activities of daily living')
search_wiki('stroke rehabilitation')
