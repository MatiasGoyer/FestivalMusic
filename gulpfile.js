const { src, dest, watch, parallel }=require("gulp");

//CSS
const sass = require('gulp-sass')(require('sass'));
const plumber= require('gulp-plumber');
const autoprefixer = require('autoprefixer');
const cssnano= require('cssnano');
const postcss= require('gulp-postcss');
const sourcemaps= require('gulp-sourcemaps');

//IMAGENES
const  cache = require ('gulp-cache');
const imagemin = require ('gulp-imagemin');
const webp = require('gulp-webp');

//JAVASCRIPT

const terser = require('gulp-terser-js');

function css(done){
    src('src/scss/**/*.scss')//Identificar el archivo de sass
    .pipe(sourcemaps.init())//inicializar source maps para tener referencias de css
    .pipe(plumber())// para que no se corte el watch
    .pipe(sass())//Compilarlo
    .pipe(postcss([autoprefixer(),cssnano()]))//deja el codigo css mas ligero
    .pipe(sourcemaps.write('.'))//donse se guarda la hoja de estilos
    .pipe(dest("build/css")) //Almacenar en el disco durfo
    

done();//esto es un callback que avisa a gulp cuando es el final

}

function imagenes(done){
    const opciones = {
        optimizationLevel:3
    }
    src('src/img/**/*.{png,jpg}')
    .pipe( cache(imagemin(opciones)))
    .pipe(dest('build/img'))
    done();
}

function versionWebp(done){
    const opciones={
        quality:50
    };
    
    src('src/img/**/*.{png,jpg}')//como sass pero las llaves son para que acepte los formatos ya que no es solo uno 
    .pipe(webp(opciones))
    .pipe(dest('build/img'))
    done();
}

function javascript(done){
    src('src/js/**/*.js')
        .pipe(sourcemaps.init())
        .pipe(terser())//aligerar codigo java
        .pipe(sourcemaps.write('.'))
        .pipe(dest('build/js'))
        done();
}

function dev(done){
    watch('src/scss/**/*.scss', css)
    watch('src/js/**/*.js', javascript)
    done();
}

exports.css =css;
exports.javascript= javascript;
exports.versionWebp=versionWebp;
exports.imagenes=imagenes;
exports.dev=parallel(javascript,dev,css);
