import fastify from 'fastify';

const server = fastify({ logger: true });

interface DriverParams {
    id: string;
}

const teams = [
    { id: 1, name: "Ferrari", base: "Maranello, Italy" },
    { id: 2, name: "McLaren", base: "Woking, United Kingdom" }, // corrigido "Wokin" para "Woking"
    { id: 3, name: "Mercedes", base: "Brackley, United Kingdom" },
    { id: 4, name: "Red Bull Racing", base: "Milton Keynes, United Kingdom" },
    { id: 5, name: "Aston Martin", base: "Silverstone, United Kingdom" },
    { id: 6, name: "Alpine", base: "Enstone, United Kingdom / Viry-Châtillon, France" },
    { id: 7, name: "Williams", base: "Grove, United Kingdom" },
    { id: 8, name: "RB (Visa Cash App RB)", base: "Faenza, Italy / Bicester, United Kingdom" },
    { id: 9, name: "Sauber (Stake F1 Team Kick Sauber)", base: "Hinwil, Switzerland" },
    { id: 10, name: "Haas", base: "Kannapolis, United States / Banbury, United Kingdom" }
];


const drivers = [
    { id: 1, name: "Charles Leclerc", team: "Ferrari" },
    { id: 2, name: "Lewis Hamilton", team: "Ferrari" },

    { id: 3, name: "Max Verstappen", team: "Red Bull Racing" },
    { id: 4, name: "Sergio Pérez", team: "Red Bull Racing" },

    { id: 5, name: "Lando Norris", team: "McLaren" },
    { id: 6, name: "Oscar Piastri", team: "McLaren" },

    { id: 7, name: "George Russell", team: "Mercedes" },
    { id: 8, name: "Andrea Kimi Antonelli", team: "Mercedes" },

    { id: 9, name: "Fernando Alonso", team: "Aston Martin" },
    { id: 10, name: "Lance Stroll", team: "Aston Martin" },

    { id: 11, name: "Esteban Ocon", team: "Alpine" },
    { id: 12, name: "Pierre Gasly", team: "Alpine" },

    { id: 13, name: "Alexander Albon", team: "Williams" },
    { id: 14, name: "Logan Sargeant", team: "Williams" },

    { id: 15, name: "Yuki Tsunoda", team: "RB (Visa Cash App RB)" },
    { id: 16, name: "Daniel Ricciardo", team: "RB (Visa Cash App RB)" },

    { id: 17, name: "Valtteri Bottas", team: "Stake F1 Team Kick Sauber" },
    { id: 18, name: "Zhou Guanyu", team: "Stake F1 Team Kick Sauber" },

    { id: 19, name: "Kevin Magnussen", team: "Haas" },
    { id: 20, name: "Nico Hülkenberg", team: "Haas" }
];


server.listen({port: 3001}, () => {
    console.log("Server is running on port 3001");
});


server.get('/teams', async(req, res) => {
    res.type("application/json").code(200);
    return {teams};
});


server.get('/drivers', async(req, res) => {
    res.type("application/json").code(200);
    return {drivers};
})


server.get<{Params: DriverParams}>('/drivers/:id', async(req, res) => {
    const id = parseInt(req.params.id)
    const driver = drivers.find(driver => driver.id === id);
    if (!driver) {
        res.type("application/json").code(404);
        return {error: "No such driver"};
    } else {
        res.type("application/json").code(200);
        return driver;
    }
})


