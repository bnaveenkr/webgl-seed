/**
 * Created by naveen on 26/12/16.
 */



var canvas = document.getElementById("webgl-example");

var gl = canvas.getContext("webgl");

if(!gl) {
    console.log("no webgl for you!")
}
else {
    var vertexShaderSource = document.getElementById("2d-vertex-shader").text;

    var fragmentShaderSource = document.getElementById("2d-fragment-shader").text;

    var vsShader = createShader(gl, gl.VERTEX_SHADER, vertexShaderSource);
    var fsShader = createShader(gl, gl.FRAGMENT_SHADER, fragmentShaderSource);

    var program = createProgram(gl, vsShader, fsShader);


    var positionAttributeLocation = gl.getAttribLocation(program, "a_position");

    var resolutionUniformLocation = gl.getUniformLocation(program, "u_resolution");
    var colorUniformLocation = gl.getUniformLocation(program, "u_color");



    gl.viewport(0, 0, gl.canvas.width, gl.canvas.height);

    gl.clearColor(0, 0, 0, 0);
    gl.clear(gl.COLOR_BUFFER_BIT);
    gl.useProgram(program);

    gl.uniform2f(resolutionUniformLocation, gl.canvas.width, gl.canvas.height);


    gl.enableVertexAttribArray(positionAttributeLocation);

    var positionBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);

    var size = 2;
    var type = gl.FLOAT;
    var normalize = false;
    var stride = 0;
    var offset = 0;
    gl.vertexAttribPointer(positionAttributeLocation, size, type, normalize, stride, offset);

    for (var i=0; i<50; i++) {

        setRectangle(gl, randomInt(512), randomInt(512), randomInt(512), randomInt(512));

        gl.uniform4f(colorUniformLocation, Math.random(), Math.random(), Math.random(), 1);

        gl.drawArrays(gl.TRIANGLES, 0, 6);

    }

    function setRectangle(gl, x, y, width, height) {
        var x1 = x;
        var x2 = x + width;
        var y1 = y;
        var y2 = y + height;

        gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([
            x1, y1,
            x2, y1,
            x1, y2,
            x1, y2,
            x2, y1,
            x2, y2]), gl.STATIC_DRAW)
    }
}


