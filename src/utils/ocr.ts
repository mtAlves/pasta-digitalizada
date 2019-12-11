import pdfReader from 'pdfreader'

// Copy and paste from https://github.com/adrienjoly/npm-pdfreader
async function readlines(buffer: Buffer, xwidth?: number) {
  return new Promise((resolve, reject) => {
    var pdftxt = new Array();
    var pg = 0;
    new pdfReader.PdfReader().parseBuffer(buffer, function(err, item) {
      if (err) console.log("pdf reader error: " + err);
      else if (!item) {
        pdftxt.forEach(function(a, idx) {
          pdftxt[idx].forEach(function(v, i) {
            pdftxt[idx][i].splice(1, 2);
          });
        });
        resolve(pdftxt);
      } else if (item && item.page) {
        pg = item.page - 1;
        pdftxt[pg] = [];
      } else if (item.text) {
        var t = 0;
        var sp = "";
        pdftxt[pg].forEach(function(val, idx) {
          if (val[1] == item.y) {
            if (xwidth && item.x - val[2] > xwidth) {
              sp += " ";
            } else {
              sp = "";
            }
            pdftxt[pg][idx][0] += sp + item.text;
            t = 1;
          }
        });
        if (t == 0) {
          pdftxt[pg].push([item.text, item.y, item.x]);
        }
      }
    });
  });
}

const flat = (arr: any) =>
  arr.reduce((acc, curr) => Array.isArray(curr) ? acc.concat(flat(curr)) : acc.concat(curr), [])

const ocr = async (pdfBuffer: Buffer): Promise<string> => {
  const txts = await readlines(pdfBuffer)

  return flat(txts).join('\n')
}

export default ocr
