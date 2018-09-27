import * as BABYLON from 'babylonjs';

window.addEventListener('DOMContentLoaded', function () {
    var canvas = document.querySelector('canvas');
    var engine = new BABYLON.Engine(canvas, true);

    let w = false;

    const createMainScene = (engine: BABYLON.Engine, canvas: HTMLElement) => {
        var scene = new BABYLON.Scene(engine);
        scene.clearColor = BABYLON.Color3.White().toColor4();
        var box = BABYLON.Mesh.CreateBox('Box', 1.0, scene);
        box.position = new BABYLON.Vector3(0, 0.5, 0);
        box.overlayColor = BABYLON.Color3.Red();

        var plane = BABYLON.Mesh.CreateGround("ground", 100, 100, 5, scene, false);

        var camera = new BABYLON.UniversalCamera('camera1',
            new BABYLON.Vector3(-1, 2, -1),
            scene);

        camera.attachControl(canvas, true)
        camera.setTarget(BABYLON.Vector3.Zero());



        scene.actionManager = new BABYLON.ActionManager(scene);

        scene.actionManager.registerAction(
            new BABYLON.ExecuteCodeAction({ trigger: BABYLON.ActionManager.OnKeyDownTrigger, parameter: "w" },
                () => {
                    w = true;
                }
            )
        )

        scene.actionManager.registerAction(
            new BABYLON.ExecuteCodeAction({ trigger: BABYLON.ActionManager.OnKeyUpTrigger, parameter: "w" },
                () => {
                    w = false;
                }
            )
        )









        var light = new BABYLON.PointLight("pointLight", new BABYLON.Vector3(0, 10, 10), scene);
        light.diffuse = new BABYLON.Color3(1, 1, 1);

        return scene;
    };

    var scene = createMainScene(engine, canvas);

    let frameCount = 0;
    engine.runRenderLoop(function () {
        if (w) scene.getCameraByID("camera1").position.x += 0.05;


        scene.render();
        frameCount++;
    });
    setInterval(() => {
        console.log("FPS: " + frameCount);
        frameCount = 0;
    }, 1000)
});



        // camera.keysUp.push(87); // w
        // camera.keysLeft.push(65); // a
        // camera.keysDown.push(83); // s
        // camera.keysRight.push(68); // d