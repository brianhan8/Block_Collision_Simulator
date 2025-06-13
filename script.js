function createBlock() {
    const mass = 1;
    const area = document.getElementById("simulationArea");

    const block = document.createElement("div");
    block.id = "block";

    const size = Math.sqrt(mass * 1000);

    block.style.width = `${size}px`;
    block.style.height = `${size}px`;
    block.style.backgroundColor = "blue";
    block.style.position = "absolute";
    block.style.left = "100px";
    block.style.bottom = "0";
    block.style.border = "2px solid black";

    area.appendChild(block);
}
function createBlock1() {
    const mass = parseFloat(document.getElementById("massInput").value);
    const area = document.getElementById("simulationArea");

    // Remove old block1 if it exists
    const oldBlock = document.getElementById("block1");
    if (oldBlock) oldBlock.remove();

    const block = document.createElement("div");
    block.id = "block1";

    const size = Math.min(Math.sqrt(mass * 1000), Math.sqrt(150 * 1000));
    if (mass > 150) {
        alert("Mass too large, setting to maximum size.");
    }
    

    block.style.width = `${size}px`;
    block.style.height = `${size}px`;
    block.style.backgroundColor = "blue";
    block.style.position = "absolute";
    block.style.left = "10px";
    block.style.bottom = "0";
    block.style.border = "2px solid black";

    area.appendChild(block);
}

function createBlock2() {
    const mass = parseFloat(document.getElementById("massInput2").value);
    const area = document.getElementById("simulationArea");

    // Remove old block2 if it exists
    const oldBlock = document.getElementById("block2");
    if (oldBlock) oldBlock.remove();

    const block = document.createElement("div");
    block.id = "block2";

    const size = Math.min(Math.sqrt(mass * 1000), Math.sqrt(150 * 1000));
    if (mass > 150) {
        alert("Mass too large, setting to maximum size.");
    }

    block.style.width = `${size}px`;
    block.style.height = `${size}px`;
    block.style.backgroundColor = "red";
    block.style.position = "absolute";
    block.style.right = "10px";
    block.style.bottom = "0";
    block.style.border = "2px solid black";

    area.appendChild(block);
}
function createBigBlock() {
    const mass = parseFloat(document.getElementById("massInput3").value);
    const area = document.getElementById("simulationArea");

    // Remove old block3 if it exists
    const oldBlock = document.getElementById("block3");
    if (oldBlock) oldBlock.remove();

    const block = document.createElement("div");
    block.id = "block3";

    const size = Math.min(Math.sqrt(Math.pow(10, mass)), 317);
    if (mass >= 6) {
        alert("Mass too large, setting to maximum size.");
    }

    block.style.width = `${size}px`;
    block.style.height = `${size}px`;
    block.style.backgroundColor = "red";
    block.style.position = "absolute";
    block.style.right = "10px";
    block.style.bottom = "0";
    block.style.border = "2px solid black";

    area.appendChild(block);

    collisionCount = 0;
    collisionCountDisplay.textContent = collisionCount;
}

function startSimulation() {
    let m1 = parseFloat(document.getElementById("massInput").value);
    let m2 = parseFloat(document.getElementById("massInput2").value);

    let v1 = parseFloat(document.getElementById("velocity1").value);
    let v2 = parseFloat(document.getElementById("velocity2").value);
    if (isNaN(v1) || isNaN(v2)) {
        alert("Please enter valid velocities for both blocks.");
        return;
    }

    const block1 = document.getElementById("block1");
    const block2 = document.getElementById("block2");

    if (!block1 || !block2) {
        alert("Create both blocks first.");
        return;
    }

    let pos1 = 10; // starting left for block1
    let pos2 = block2.parentElement.clientWidth - block2.offsetWidth - 10; // starting right for block2

    // Set initial positions
    block1.style.left = pos1 + "px";
    block2.style.left = pos2 + "px";

    // Make sure right positioning doesn't interfere
    block2.style.right = "";
    block2.style.left = pos2 + "px";

    const area = document.getElementById("simulationArea");
    const rect = area.getBoundingClientRect();
    const maxLeft = 0;
    const maxRight = area.clientWidth;  // width of the simulation area



    const interval = setInterval(() => {

        document.getElementById("velocity1").value = v1;
        document.getElementById("velocity2").value = v2;


        pos1 += v1;
        pos2 += v2;

        block1.style.left = pos1 + "px";
        block2.style.left = pos2 + "px";

        // Collision detection
        const b1Right = pos1 + block1.offsetWidth;
        if (b1Right >= pos2) {
            const v1Old = v1;
            const v2Old = v2;

            v1 = Math.round(((m1 - m2) / (m1 + m2)) * v1Old + (2 * m2 / (m1 + m2)) * v2Old);
            v2 = Math.round((2 * m1 / (m1 + m2)) * v1Old + ((m2 - m1) / (m1 + m2)) * v2Old);

        }

        if (pos1 <= maxLeft) {
            v1 *= -1;
        }
        if (pos2 + block2.offsetWidth >= maxRight) {
            v2 *= -1;
        }

    }, 16); // roughly 60 frames per second
}

function startSimulation2() {
    let m1 = 1;
    let m2 = parseFloat(document.getElementById("massInput3").value);
    let mass2 = m2;
    m2 = Math.pow(100, m2);
    let v1 = 0;
    let v2 = -5;

    const block1 = document.getElementById("block");
    const block2 = document.getElementById("block3");

    if (!block3) {
        alert("Create block2 first.");
        return;
    }

    let pos1 = 100; // starting left for block1
    let pos2 = block2.parentElement.clientWidth - block2.offsetWidth - 10; // starting right for block2

    // Set initial positions
    block1.style.left = pos1 + "px";
    block2.style.left = pos2 + "px";

    // Make sure right positioning doesn't interfere
    block2.style.right = "";
    block2.style.left = pos2 + "px";

    const area = document.getElementById("simulationArea");
    const rect = area.getBoundingClientRect();
    const maxLeft = 0;
    const maxRight = area.clientWidth;  // width of the simulation area



    let interval = null;
    let collisionCount = 0;
    const collisionCountDisplay = document.getElementById("collisionCountDisplay");

    let frames = 16
    if (mass2 >= 2) {
        frames = 16/(mass2-1);
    }
    if (mass2 >= 4) {
        v2 = Number.MIN_SAFE_INTEGER;
    }
     interval = setInterval(() => {
        pos1 += v1;
        pos2 += v2;

        block1.style.left = pos1 + "px";
        block2.style.left = pos2 + "px";

        // Collision detection
        const b1Right = pos1 + block1.offsetWidth;
        if (b1Right >= pos2) {
            const v1Old = v1;
            const v2Old = v2;

            v1 = ((m1 - m2) / (m1 + m2)) * v1Old + (2 * m2 / (m1 + m2)) * v2Old;
            v2 = (2 * m1 / (m1 + m2)) * v1Old + ((m2 - m1) / (m1 + m2)) * v2Old;

            collisionCount++;
            collisionCountDisplay.textContent = collisionCount;
        }

        if (pos1 <= maxLeft) {
            v1 *= -1;
            collisionCount++;
            collisionCountDisplay.textContent = collisionCount;
        }
        if (pos2 + block2.offsetWidth >= maxRight) {
            clearInterval(interval);
            interval = null;
        }

    }, frames); // roughly 60 frames per second
}
