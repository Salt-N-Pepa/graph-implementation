class Graph {
    constructor() {
        this.vertices = [];
        this.edges = [];
        this.numberOfEdges = 0;
    }

    addVertex(vertex) {
        this.vertices.push(vertex);

        this.edges[vertex] = [];
    }

    removeVertex(vertex) {
        const index = this.vertices.indexOf(vertex);

        if(index >= 0) {
            this.vertices.splice(index, 1); //Deleta o elemento no indice
        }

        while(this.edges[vertex].length) {
            const adjacentVertex = this.edges[vertex].pop();

            this.removeEdge(adjacentVertex, vertex);
        }
    }

    addEdge(vertex1, vertex2) {
        this.edges[vertex1].push(vertex2)
        this.edges[vertex2].push(vertex1)
        this.numberOfEdges ++;
    }

    removeEdge(vertex1, vertex2) {
        const index1 = this.edges[vertex1] ? this.edges[vertex1].indexOf(vertex2) : -1
        const index2 = this.edges[vertex2] ? this.edges[vertex2].indexOf(vertex1) : -1

        if(index1 >= 0) {
            this.edges[vertex1].splice(index1, 1);
            this.numberOfEdges --;
        }

        if(index2 >= 0) {
            this.edges[vertex2].splice(index2, 1);
        }
    }

    size() {
        return this.vertices.length;
    }

    relations() {
        return this.numberOfEdges;
    }

    print() {
        console.log(this.vertices.map(vertex => {
            return `${vertex} => ${this.edges[vertex].join(', ').trim()}`
        }, this).join(' | '));
    }
}

(function test() {
    let graph = new Graph()

    graph.addVertex('1')
    graph.addVertex('2')
    graph.addVertex('3')
    graph.addVertex('4')

    graph.addEdge('1', '2')
    graph.addEdge('1', '3')

    graph.removeVertex('4')

    graph.removeEdge('1', '2')

    graph.print()
})()