const fs = require('fs').promises;
const path = require('path');
const crypto = require('crypto');


const normalize = (str) => str?.trim().toLowerCase().replace(/\s+/g, ' ') || '';


const generateId = (...parts) => {
  const key = parts.map(normalize).join('|');
  return crypto.createHash('sha1').update(key).digest('hex').slice(0, 12);
};


const flattenVillageData = (data, state) => {
  if (!data?.districts || !Array.isArray(data.districts)) {
    throw new Error('Invalid JSON structure: "districts" array is required');
  }

  const seen = new Set();

  return data.districts.flatMap((d) => {
    if (!Array.isArray(d.subDistricts)) return [];

    return d.subDistricts.flatMap((sd) => {
      if (!Array.isArray(sd.villages)) return [];

      return sd.villages.reduce((acc, village) => {
        const id = generateId(state, d.district, sd.subDistrict, village);


        if (!seen.has(id)) {
          seen.add(id);
          acc.push({
            id,
            state: state.trim(),
            district: d.district?.trim(),
            subDistrict: sd.subDistrict?.trim(),
            village: village?.trim()
          });
        }
        return acc;
      }, []);
    });
  });
};





async function processVillages(inputFilename, outputFilename, targetState) {
  const inputPath = path.resolve(__dirname, inputFilename);
  const outputPath = path.resolve(__dirname, outputFilename);

  try {
    console.log(`[1/3] Reading input file: ${inputFilename}...`);
    const rawData = await fs.readFile(inputPath, 'utf-8');
    const jsonData = JSON.parse(rawData);

    console.log(`[2/3] Processing village data for state: ${targetState}...`);
    const processedData = flattenVillageData(jsonData, targetState);

    console.log(`      ✓ Successfully processed ${processedData.length} unique villages.`);

    console.log(`[3/3] Writing results to: ${outputFilename}...`);
    await fs.writeFile(outputPath, JSON.stringify(processedData, null, 2));

    console.log('✨ Data extraction complete!');
  } catch (error) {
    if (error.code === 'ENOENT') {
      console.error(`❌ Error: Input file not found at ${inputPath}`);
      console.log('      Please ensure your input.json file exists in the directory.');
    } else if (error instanceof SyntaxError) {
      console.error(`❌ Error: Input file is not valid JSON. (${error.message})`);
    } else {
      console.error(`❌ Error: ${error.message}`);
    }
    process.exit(1);
  }
}




const [,, input = 'input.json', output = 'output.json', state = 'Maharashtra'] = process.argv;

processVillages(input, output, state);