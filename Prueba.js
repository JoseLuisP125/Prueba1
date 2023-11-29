const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');

const app = express();
const port = 3000;

app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
  });

app.post('/rotar', (req, res) => {
  try {
    // Verificar si la solicitud contiene el campo 'matrix'
    if (!req.body.matrix) {
      return res.status(400).json({ error: 'La matriz es obligatoria en el cuerpo de la solicitud.' });
    }

    // Obtener la matriz desde la solicitud
    const matrix = req.body.matrix;

    // Verificar si la matriz es cuadrada
    const n = matrix.length;
    if (!matrix.every(row => row.length === n)) {
      return res.status(400).json({ error: 'La matriz no es cuadrada.' });
    }

    // Rotar la matriz en sentido antihorario (90 grados)
    const rotar_antihorario = rotarantihorario(matrix);
    // Rotar la matriz en sentido horario (90 grados)
    const rotar_horario = rotarhorario(matrix);
    // Devolver respuesta
    res.json({
        rotar_antihorario,
        rotar_horario
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Error interno del servidor.' });
    }
  });

// Funciones para rotar la matriz
function rotarantihorario(matrix) {
  const n = matrix.length;
  const r = Array.from({ length: n }, () => Array(n).fill(0));

  for (let i = 0; i < n; i++) {
    for (let j = 0; j < n; j++) {
      r[i][j] = matrix[n - j - 1][i];
    }
  }

  return r;
}

function rotarhorario(matrix) {
    const n = matrix.length;
    const r = Array.from({ length: n }, () => Array(n).fill(0));
  
    for (let i = 0; i < n; i++) {
      for (let j = 0; j < n; j++) {
        r[i][j] = matrix[j][n - i - 1];
      }
    }
  
    return r;
  }

app.listen(port, () => {
  console.log(`Servidor escuchando en http://localhost:${port}`);
});