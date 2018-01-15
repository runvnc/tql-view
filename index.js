const timequerylog = require('timequerylog');
const {queryMultiArray} = timequerylog;

const blessed = require('blessed');
const {screen, prompt, table} = blessed;

const scn = screen({smartCSR: true});

const type = prompt({
  top: 'center',
  left: 'center',
  width: '50%',
  height: '50%',
  label: "Test",
  content: 'Hello {bold}world{/bold}!',
  tags: true,
  border: {
    type: 'line'
  },
  style: {
    fg: 'white',
    bg: 'magenta',
    border: {
      fg: '#f0f0f0'
    },
    hover: {
      bg: 'green'
    }
  } 
});

scn.append(type);

scn.key(['escape', 'q', 'C-c'], function(ch, key) {
  return process.exit(0);
});

scn.render();

const data = table({
  top: 'center',
  left: 'center',
  width: '50%',
  height: '50%',
  label: "Test",
  scrollable: true,
  content: 'Hello {bold}world{/bold}!',
  tags: true,
  border: {
    type: 'line'
  },
  style: {
    fg: 'white',
    bg: 'magenta',
    border: {
      fg: '#f0f0f0'
    },
    hover: {
      bg: 'green'
    }
  } 
});

scn.append(type);

let results;

function toRows(dat) {
  let ret = [];
  for (let row of dat) {
    let cols = [];
    cols.push(row.time.toTimeString());
    cols.push(row.type);
    for (let key in row) {
      if (key=='time' || key=='type') continue;
      cols.push(row[key]);
    }
    ret.push(cols);
  }
  return ret;
}

let dat_;

type.input('Type glob:','', function (a,typeGlob) {
  type.hidden = true;
  let args = {typeGlob,
              start:new Date('1980-01-01'), end:new Date()};
  results = queryMultiArray(args);
  dat_ = toRows(results);
  data.setData(dat_);
});
