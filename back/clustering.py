

"""
基于 sentence embeddings的聚类：kmeans
不足：需要指定聚类的个数

:params resp_repos: 从数据库中查询的到的结果
:return 
"""
def kmeans(resp_repos):
    from sentence_transformers import SentenceTransformer
    from sklearn.cluster import KMeans
    
    descriptions_corpus = []
    for repo in resp_repos:
        if repo['_source']['description'] is None:
            descriptions_corpus.append('')
        else:
            descriptions_corpus.append(repo['_source']['description'])

    embedder = SentenceTransformer('all-MiniLM-L6-v2')

    # Corpus with example sentences
    corpus = ['A man is eating food.',
            'A man is eating a piece of bread.',
            'A man is eating pasta.',
            'The girl is carrying a baby.',
            'The baby is carried by the woman',
            'A man is riding a horse.',
            'A man is riding a white horse on an enclosed ground.',
            'A monkey is playing drums.',
            'Someone in a gorilla costume is playing a set of drums.',
            'A cheetah is running behind its prey.',
            'A cheetah chases prey on across a field.'
            ]

    corpus_embeddings = embedder.encode(descriptions_corpus)

    # Perform kmean clustering
    num_clusters = 5
    clustering_model = KMeans(n_clusters=num_clusters)
    clustering_model.fit(corpus_embeddings)
    cluster_assignment = clustering_model.labels_

    clustered_sentences = [[] for i in range(num_clusters)]
    for sentence_id, cluster_id in enumerate(cluster_assignment):
        clustered_sentences[cluster_id].append(corpus[sentence_id])

    for i, cluster in enumerate(clustered_sentences):
        print("Cluster ", i+1)
        print(cluster)
        print("")

def fastclustring(resp_repos):
    from sentence_transformers import SentenceTransformer, util
    import os
    import csv
    import time

    model = SentenceTransformer('all-MiniLM-L6-v2')

    descriptions_corpus = []
    for repo in resp_repos:
        if repo['_source']['description'] is None:
            descriptions_corpus.append('')
        else:
            descriptions_corpus.append(repo['_source']['description'])

    print("Encode the corpus. This might take a while")
    corpus_embeddings = model.encode(descriptions_corpus, batch_size=64, show_progress_bar=True, convert_to_tensor=True)
    print(descriptions_corpus)

    print("Start clustering")
    start_time = time.time()

    #Two parameters to tune:
    #min_cluster_size: Only consider cluster that have at least 25 elements
    #threshold: Consider sentence pairs with a cosine-similarity larger than threshold as similar
    clusters = util.community_detection(corpus_embeddings, min_community_size=5, threshold=0.5)

    print("Clustering done after {:.2f} sec".format(time.time() - start_time))

    #Print for all clusters the top 3 and bottom 3 elements
    for i, cluster in enumerate(clusters):
        print("\nCluster {}, #{} Elements ".format(i+1, len(cluster)))
        for sentence_id in cluster[0:3]:
            print("\t", descriptions_corpus[sentence_id])
        print("\t", "...")
        for sentence_id in cluster[-3:]:
            print("\t", descriptions_corpus[sentence_id])



if __name__ == '__main__':
    # kmeans([])
    fastclustring([])