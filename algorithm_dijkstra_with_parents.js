const  graph = {}
graph.book = {disk: 5, poster: 1}
graph.disk = {baraban: 20, gitara: 15}
graph.poster = {baraban: 35, gitara: 30}
graph.baraban = {piano:10}
graph.gitara = {piano: 20}
graph.piano = {}



function findCheaperPathChange(graph, start, end) {
    let costs = {}
    let processed = []
    let parent = {}
    for (item in graph) {
        if (item == 'book') continue
        let cost = graph[start][item] || 100
        parent[item] = start
        costs[item] = cost
    }
    let node = findTheLowestNode(costs, processed)
    while (node) {
        processed.push(node);
        let neigbours = graph[node]
        for( neigbour in neigbours) {
            let oldCost = costs[neigbour]
            let newCost = graph[node][neigbour] + costs[node]
            if(oldCost > newCost) {
                costs[neigbour] = newCost
                parent[neigbour] = node
            }
        }
        node = findTheLowestNode(costs, processed)
    }
    // итоговый путь
    let wayElem = end
    let way = []
    way.push(end)
    while (wayElem) {
        if(parent[wayElem]) {
            way.push(parent[wayElem])
        }
        wayElem = parent[wayElem]
    }
    console.log(way)
}

function findTheLowestNode(costs, processed){

    let lowestCost = 100
    let lowestNode = undefined
    for(node in costs) {
        if(costs[node] < lowestCost && !processed.includes(node)) {
            lowestCost = costs[node]
            lowestNode = node
        }
    }
    return lowestNode
}

findCheaperPathChange(graph, 'book', 'piano')