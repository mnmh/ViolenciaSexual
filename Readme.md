# GUION CURATORIAL Especial web V.S.

## "Transformar lo vivido: memorias desde nuestros cuerpos"

El Centro Nacional de Memoria Histórica (CNMH) y el Museo de Memoria presentan "Transformar lo vivido: memorias desde nuestros cuerpos", un especial digital construido junto a la Red de Mujeres, Víctimas y Profesionales (RMVP), el cual reconoce las dimensiones y los impactos de la violencia sexual dentro y fuera del conflicto armado. Este proyecto entraña un proceso participativo en el que se quiere reconocer la potencia testimonial y transformadora de las víctimas. Además, busca visibilizar la diversidad de cuerpos impactados por este hecho victimizante y, por tanto, la diversidad de voces que buscan romper los silencios. Cada una de ellas, convirtiéndose en procesos y artefactos para la sanación, la resistencia y la resiliencia de las víctimas.

## Apuntes para desarrolladores

Esta es una plantilla dinámica en React que consume los datos desde la API de Wordpress, así, pueden crearse contenidos con diseño visual a medida sin que se requiera de otro gestor de contenidos diferente, y que los datos queden almacenados en la misma base de datos de todo el sitio web.

Estrcutura de la url:

    http://localhost:3000/especiales/app/?pagina=14941&plantilla=violencia-sexual

| raiz                   | ruta relativa   | selector content | selector tema               |
| ---------------------- | --------------- | ---------------- | --------------------------- |
| http://localhost:3000/ | especiales/app/ | ?pagina=14941    | &plantilla=violencia-sexual |

El paquete tiene fija la versión de NPM 16, así que deberá gestionarse con NVM

    nvm use 16

