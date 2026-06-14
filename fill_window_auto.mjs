import { Jimp } from 'jimp';

async function main() {
    try {
        const imagePath = './public/logo/logo.png';
        console.log('Reading image from:', imagePath);
        const image = await Jimp.read(imagePath);
        
        const width = image.bitmap.width;
        const height = image.bitmap.height;
        console.log(`Image dimensions: ${width}x${height}`);
        
        const data = image.bitmap.data;
        
        // 1. Run BFS from boundaries to find all transparent pixels connected to the outside.
        const connectedToOutside = new Uint8Array(width * height);
        const queue = [];
        
        function enqueue(x, y) {
            const idx = y * width + x;
            const dataIdx = idx * 4;
            const a = data[dataIdx + 3];
            
            // If the pixel is transparent and not visited yet
            if (a < 255 && connectedToOutside[idx] === 0) {
                connectedToOutside[idx] = 1;
                queue.push({ x, y });
            }
        }
        
        // Enqueue boundary pixels
        for (let x = 0; x < width; x++) {
            enqueue(x, 0);
            enqueue(x, height - 1);
        }
        for (let y = 1; y < height - 1; y++) {
            enqueue(0, y);
            enqueue(width - 1, y);
        }
        
        let head = 0;
        while (head < queue.length) {
            const { x, y } = queue[head++];
            
            const dirs = [
                [-1, 0], [1, 0], [0, -1], [0, 1]
            ];
            for (const [dx, dy] of dirs) {
                const nx = x + dx;
                const ny = y + dy;
                if (nx >= 0 && nx < width && ny >= 0 && ny < height) {
                    enqueue(nx, ny);
                }
            }
        }
        
        console.log(`Total transparent pixels connected to outside: ${queue.length}`);
        
        // 2. Any transparent pixel not connected to the outside is an isolated gap (like the car window).
        // Let's fill them with solid white.
        let filledCount = 0;
        for (let y = 0; y < height; y++) {
            for (let x = 0; x < width; x++) {
                const idx = y * width + x;
                const dataIdx = idx * 4;
                const a = data[dataIdx + 3];
                
                if (a < 255 && connectedToOutside[idx] === 0) {
                    data[dataIdx] = 255;     // R
                    data[dataIdx + 1] = 255; // G
                    data[dataIdx + 2] = 255; // B
                    data[dataIdx + 3] = 255; // A
                    filledCount++;
                }
            }
        }
        
        console.log(`Filled ${filledCount} isolated transparent pixels (car window) with white.`);
        console.log('Writing image to:', imagePath);
        await image.write(imagePath);
        console.log('Successfully completed!');
    } catch (err) {
        console.error('Error processing image:', err);
    }
}

main();
