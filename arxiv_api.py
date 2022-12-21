import urllib, urllib.request

def arxiv_apidata(author_str, upperbound):
    url = 'http://export.arxiv.org/api/query?search_query=au:{0}&start=0&max_results={1}'.format(author_str, upperbound)
    data = urllib.request.urlopen(url)
    return(data.read().decode('utf-8'))

#this functions returns an atom feed of the paper metadata affiliated with a particular author_str and an uppoerbound of how many papers should be loaded
