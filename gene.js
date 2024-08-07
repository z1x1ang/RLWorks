// Number of cities in TSP
const V = 5;

// Names of the cities
const GENES = "ABCDE";

// Starting Node Value
const START = 0;

// Initial population size for the algorithm
const POP_SIZE = 10;

// Structure of a GNOME
// string defines the path traversed
// by the salesman while the fitness value
// of the path is stored in an integer
class Individual {
    constructor(gnome, fitness) {
        this.gnome = gnome;
        this.fitness = fitness;
    }
}

// Function to return a random number
// from start and end
function rand_num(start, end) {
    let r = end - start;
    let rnum = start + Math.floor(Math.random() * r);
    return rnum;
}

// Function to check if the character
// has already occurred in the string
function repeat(s, ch) {
    return s.includes(ch);
}

// Function to return a mutated GNOME
// Mutated GNOME is a string
// with a random interchange
// of two genes to create variation in species
function mutatedGene(gnome) {
    while (true) {
        let r = rand_num(1, V);
        let r1 = rand_num(1, V);
        if (r1 !== r) {
            let temp = gnome[r];
            gnome[r] = gnome[r1];
            gnome[r1] = temp;
            break;
        }
    }
    return gnome;
}

// Function to return a valid GNOME string
// required to create the population
function create_gnome() {
    let gnome = "0";
    while (true) {
        if (gnome.length === V) {
            gnome += gnome[0];
            break;
        }
        let temp = rand_num(1, V);
        if (!repeat(gnome, temp.toString())) {
            gnome += temp.toString();
        }
    }
    return gnome;
}

// Function to return the fitness value of a gnome.
// The fitness value is the path length
// of the path represented by the GNOME.
function cal_fitness(gnome) {
    const map = [
        [0, 2, Infinity, 12, 5],
        [2, 0, 4, 8, Infinity],
        [Infinity, 4, 0, 3, 3],
        [12, 8, 3, 0, 10],
        [5, Infinity, 3, 10, 0]
    ];
    let f = 0;
    for (let i = 0; i < gnome.length - 1; i++) {
        if (map[gnome[i]][gnome[i + 1]] === Infinity) {
            return Infinity;
        }
        f += map[gnome[i]][gnome[i + 1]];
    }
    return f;
}

// Function to return the updated value
// of the cooling element.
function cooldown(temp) {
    return (90 * temp) / 100;
}

// Utility function for TSP problem.
function TSPUtil() {
    // Generation Number
    let gen = 1;
    // Number of Gene Iterations
    const gen_thres = 5;

    let population = [];

    // Populating the GNOME pool.
    for (let i = 0; i < POP_SIZE; i++) {
        let gnome = create_gnome();
        let fitness = cal_fitness(gnome);
        population.push(new Individual(gnome, fitness));
    }

    console.log("\nInitial population: ");
    population.forEach(individual => {
        console.log(`${individual.gnome} ${individual.fitness}`);
    });
    console.log("\n");

    let found = false;
    let temperature = 10000;

    // Iteration to perform
    // population crossing and gene mutation.
    while (temperature > 1000 && gen <= gen_thres) {
        population.sort((a, b) => a.fitness - b.fitness);
        console.log("\nCurrent temp: " + temperature + "\n");
        let new_population = [];

        for (let i = 0; i < POP_SIZE; i++) {
            let p1 = population[i];

            while (true) {
                let new_g = mutatedGene(p1.gnome);
                let new_gnome = new Individual(new_g, cal_fitness(new_g));

                if (new_gnome.fitness <= population[i].fitness) {
                    new_population.push(new_gnome);
                    break;
                } else {
                    // Accepting the rejected children at
                    // a possible probability above threshold.
                    let prob = Math.pow(
                        2.7,
                        -1 *
                        ((new_gnome.fitness - population[i].fitness) /
                            temperature)
                    );
                    if (prob > 0.5) {
                        new_population.push(new_gnome);
                        break;
                    }
                }
            }
        }

        temperature = cooldown(temperature);
        population = new_population;
        console.log("Generation " + gen + " \n");
        console.log("GNOME     FITNESS VALUE\n");

        population.forEach(individual => {
            console.log(`${individual.gnome} ${individual.fitness}`);
        });
        gen++;
    }
}

// Main function
function main() {
    TSPUtil();
}

main();
