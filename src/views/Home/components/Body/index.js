/*
 * @Description: 
 * @version: 
 * @Author: zouwenqin
 * @Date: 2021-11-15 10:37:05
 * @LastEditors: zouwenqin
 * @LastEditTime: 2022-01-12 17:25:37
 */
import {
    defineComponent,
    onMounted,
    reactive,
    ref,
    computed
} from 'vue';
import PLAY_MODE from '@/assets/js/constant';
import homeService from '@/service/home.service';
import {
    useStore,
    mapActions
} from 'vuex';
import BScroll from '@better-scroll/core'
import MouseWheel from '@better-scroll/mouse-wheel';
import ObserveDOM from '@better-scroll/observe-dom';
BScroll.use(MouseWheel).use(ObserveDOM);
export default defineComponent({
    name: 'headBar',
    components: {},
    setup(props, {
        attrs,
        slots,
        emit
    }) {
        let height = window.innerHeight;
        // ref
        const listRef = ref(null);
        const loadingText = ref('加载中...');
        const flag = ref(true);
        const textValue = ref('');
        const bodyState = reactive({
            list: [],
            currentIndex: 0
        });
        // methods
        const headBarLeftClick = () => {
            emit('lftClick')
        };
        const headBarRightClick = () => {
            window.location.href = 'https://github.com/sarbia-offical/v3demo3'
        };
        // computed
        let loading = computed(() => {
            return flag.value;
        })
        setTimeout(() => {
            flag.value = false;
        }, 1500)
        const Detector = {
            canvas: !!window.CanvasRenderingContext2D,
            webgl: (function () {
                try {
                    return !!window.WebGLRenderingContext && !!document.createElement('canvas').getContext(
                        'experimental-webgl');
                } catch (e) {
                    return false;
                }
            })(),
            workers: !!window.Worker,
            fileapi: window.File && window.FileReader && window.FileList && window.Blob,

            getWebGLErrorMessage: function () {

                var domElement = document.createElement('div');

                domElement.style.fontFamily = 'monospace';
                domElement.style.fontSize = '13px';
                domElement.style.textAlign = 'center';
                domElement.style.background = '#eee';
                domElement.style.color = '#000';
                domElement.style.padding = '1em';
                domElement.style.width = '475px';
                domElement.style.margin = '5em auto 0';

                if (!this.webgl) {

                    domElement.innerHTML = window.WebGLRenderingContext ? [
                        'Sorry, your graphics card doesn\'t support <a href="http://khronos.org/webgl/wiki/Getting_a_WebGL_Implementation">WebGL</a>'
                    ].join('\n') : [
                        'Sorry, your browser doesn\'t support <a href="http://khronos.org/webgl/wiki/Getting_a_WebGL_Implementation">WebGL</a><br/>',
                        'Please try with',
                        '<a href="http://www.google.com/chrome">Chrome 10</a>, ',
                        '<a href="http://www.mozilla.com/en-US/firefox/all-beta.html">Firefox 4</a> or',
                        '<a href="http://nightly.webkit.org/">Safari 6</a>'
                    ].join('\n');

                }

                return domElement;

            },

            addGetWebGLMessage: function (parameters) {

                var parent, id, domElement;

                parameters = parameters || {};

                parent = parameters.parent !== undefined ? parameters.parent : document.body;
                id = parameters.id !== undefined ? parameters.id : 'oldie';

                domElement = Detector.getWebGLErrorMessage();
                domElement.id = id;
                console.log(parent);
                parent.appendChild(domElement);

            }

        };
        if (!Detector.webgl) {
            Detector.addGetWebGLMessage();
        }

        // Bg gradient

        var canvas = document.createElement('canvas');
        canvas.width = 32;
        canvas.height = window.innerHeight;

        var context = canvas.getContext('2d');

        var gradient = context.createLinearGradient(0, 0, 0, canvas.height);
        gradient.addColorStop(0, "#1e4877");
        gradient.addColorStop(0.5, "#4584b4");

        context.fillStyle = gradient;
        context.fillRect(0, 0, canvas.width, canvas.height);
        setTimeout(() => {
            document.querySelector('.cloud').style.background = 'url(' + canvas.toDataURL('image/png') + ')';
        })

        // Clouds

        var container;
        var camera, scene, renderer, sky, mesh, geometry, material,
            i, h, color, colors = [],
            sprite, size, x, y, z;

        var mouseX = 0,
            mouseY = 0;
        var start_time = new Date().getTime();

        var windowHalfX = window.innerWidth / 2;
        var windowHalfY = window.innerHeight / 2;

        init();
        animate();

        function init() {

            container = document.createElement('div');
            setTimeout(() => {
                document.querySelector('.cloud').appendChild(container);
            })

            camera = new THREE.Camera(30, window.innerWidth / window.innerHeight, 1, 3000);
            camera.position.z = 6000;

            scene = new THREE.Scene();

            geometry = new THREE.Geometry();

            var texture = THREE.ImageUtils.loadTexture(require('@/assets/img/cloud10.png'));
            console.log(texture);
            texture.magFilter = THREE.LinearMipMapLinearFilter;
            texture.minFilter = THREE.LinearMipMapLinearFilter;

            var fog = new THREE.Fog(0x4584b4, -100, 3000);

            material = new THREE.MeshShaderMaterial({

                uniforms: {

                    "map": {
                        type: "t",
                        value: 2,
                        texture: texture
                    },
                    "fogColor": {
                        type: "c",
                        value: fog.color
                    },
                    "fogNear": {
                        type: "f",
                        value: fog.near
                    },
                    "fogFar": {
                        type: "f",
                        value: fog.far
                    },

                },
                vertexShader: document.getElementById('vs').textContent,
                fragmentShader: document.getElementById('fs').textContent,
                depthTest: false

            });

            var plane = new THREE.Mesh(new THREE.Plane(64, 64));

            for (i = 0; i < 8000; i++) {

                plane.position.x = Math.random() * 1000 - 500;
                plane.position.y = -Math.random() * Math.random() * 200 - 15;
                plane.position.z = i;
                plane.rotation.z = Math.random() * Math.PI;
                plane.scale.x = plane.scale.y = Math.random() * Math.random() * 1.5 + 0.5;

                GeometryUtils.merge(geometry, plane);

            }

            mesh = new THREE.Mesh(geometry, material);
            scene.addObject(mesh);

            mesh = new THREE.Mesh(geometry, material);
            mesh.position.z = -8000;
            scene.addObject(mesh);

            renderer = new THREE.WebGLRenderer({
                antialias: false
            });
            renderer.setSize(window.innerWidth, window.innerHeight);
            container.appendChild(renderer.domElement);

            document.addEventListener('touchmove', onDocumentMouseMove, false);
            window.addEventListener('resize', onWindowResize, false);

        }

        function onDocumentMouseMove(event) {
            const {
                touches
            } = event;
            mouseX = (touches[0].clientX - windowHalfX) * 0.5;
            mouseY = (touches[0].clientY - windowHalfY) * 0.15;

        }

        function onWindowResize(event) {

            camera.aspect = window.innerWidth / window.innerHeight;
            camera.updateProjectionMatrix();

            renderer.setSize(window.innerWidth, window.innerHeight);

        }

        function animate() {

            requestAnimationFrame(animate);
            render();

        }

        function render() {

            let position = ((new Date().getTime() - start_time) * 0.03) % 8000;
            camera.position.x += (mouseX - camera.target.position.x) * 0.01;
            camera.position.y += (-mouseY - camera.target.position.y) * 0.01;
            camera.position.z = -position + 8000;
            camera.target.position.x = camera.position.x;
            camera.target.position.y = camera.position.y;
            camera.target.position.z = camera.position.z - 1000;
            renderer.render(scene, camera);
        }

        return {
            bodyState,
            listRef,
            loading,
            loadingText,
            textValue,
            headBarLeftClick,
            headBarRightClick
        }
    }
})