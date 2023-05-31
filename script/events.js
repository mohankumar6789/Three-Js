renderer.domElement.addEventListener("mousedown", onMouseDown, false);
renderer.domElement.addEventListener("mouseup", onMouseUp, false);
renderer.domElement.addEventListener("mousemove", onMouseMove, false);

document.getElementById('gui').appendChild(gui.domElement);

var gcontrols = {
    Month: 6,
    DayMo: 15,
    Viewpoint: "Level"
};

var gui = new dat.GUI();
var folder = gui.addFolder("Date");
folder.add(gcontrols, "Month").min(1).max(12).step(1).name("Month").listen();
folder.add(gcontrols, "DayMo").min(1).max(31).step(1).name("Day").listen();
folder.add(gcontrols, "Viewpoint", ["Level", "Earth", "Fixed"]).name("View").listen();
folder.open();

class EventDispatcher {

    addEventListener(type, listener) {
        if (this._listeners === undefined) this._listeners = {};
        const listeners = this._listeners;

        if (listeners[type] === undefined) {
            listeners[type] = [];
        }

        if (listeners[type].indexOf(listener) === - 1) {
            listeners[type].push(listener);
        }
    }

    hasEventListener(type, listener) {
        if (this._listeners === undefined) return false;
        const listeners = this._listeners;
        return listeners[type] !== undefined && listeners[type].indexOf(listener) !== - 1;
    }

    removeEventListener(type, listener) {
        if (this._listeners === undefined) return;
        const listeners = this._listeners;
        const listenerArray = listeners[type];

        if (listenerArray !== undefined) {
            const index = listenerArray.indexOf(listener);
            if (index !== - 1) {
                listenerArray.splice(index, 1);
            }
        }
    }

    dispatchEvent(event) {

        if (this._listeners === undefined) return;
        const listeners = this._listeners;
        const listenerArray = listeners[event.type];

        if (listenerArray !== undefined) {

            event.target = this;
            const array = listenerArray.slice(0);
            for (let i = 0, l = array.length; i < l; i++) {
                array[i].call(this, event);
            }
            event.target = null;
        }
    }
}

export { EventDispatcher };