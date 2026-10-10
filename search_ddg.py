from duckduckgo_search import DDGS

def get_img(q):
    with DDGS() as ddgs:
        results = ddgs.images(q, max_results=1)
        if results:
            print(q + ": " + results[0]['image'])
        else:
            print(q + ": No results")

get_img('hand physical therapy')
get_img('sensory integration child therapy')
get_img('post injury rehabilitation physical therapy clinic')
get_img('pediatric occupational therapy')
get_img('occupational therapy activities of daily living elderly')
get_img('stroke neurological rehabilitation')
