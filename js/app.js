document.addEventListener("DOMContentLoaded", function() {
    const topElement = document.querySelector("#home");

    if (topElement) {
        topElement.scrollIntoView({ behavior: "smooth", block: "start" });
    }
});
const util = (() => {

    const opacity = (id) => {
        let nm = document.getElementById(id);
        let op = parseInt(nm.style.opacity);
        let clear = null;

        clear = setInterval(() => {
            if (op >= 0) {
                nm.style.opacity = op.toString();
                op -= 0.025;
            } else {
                clearInterval(clear);
                clear = null;
                nm.remove();
                return;
            }
        }, 10);
    };

    const escapeHtml = (unsafe) => {
        return unsafe
            .replace(/&/g, '&amp;')
            .replace(/</g, '&lt;')
            .replace(/>/g, '&gt;')
            .replace(/"/g, '&quot;')
            .replace(/'/g, '&#039;');
    };

    const timer = () => {
        let countDownDate = (new Date(document.getElementById('date').getAttribute('data-date').replace(' ', 'T'))).getTime();

        setInterval(() => {
            let distance = Math.abs(countDownDate - (new Date()).getTime());

            document.getElementById('day').innerText = Math.floor(distance / (1000 * 60 * 60 * 24));
            document.getElementById('hour').innerText = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            document.getElementById('minute').innerText = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
            document.getElementById('seconds').innerText = Math.floor((distance % (1000 * 60)) / 1000);
        }, 1000);
    };

    const play = (btn) => {
        if (btn.getAttribute('data-status') !== 'true') {
            btn.setAttribute('data-status', 'true');
            audio.play();
            btn.innerHTML = '<i class="fa-solid fa-circle-pause"></i>';
        } else {
            btn.setAttribute('data-status', 'false');
            audio.pause();
            btn.innerHTML = '<i class="fa-solid fa-circle-play"></i>';
        }
    };
	
    const animation = async () => {
        const duration = 10 * 1000;
        const animationEnd = Date.now() + duration;
        let skew = 1;

        let randomInRange = (min, max) => {
            return Math.random() * (max - min) + min;
        };

        (async function frame() {
            const timeLeft = animationEnd - Date.now();
            const ticks = Math.max(200, 500 * (timeLeft / duration));

            skew = Math.max(0.8, skew - 0.001);

            await confetti({
                particleCount: 1,
                startVelocity: 0,
                ticks: 20000,
                origin: {
                    x: Math.random(),
                    y: Math.random() * skew - 0.2,
                },
                colors: ["FFBF00", "FFEA00", "FDDA0D", "FF5733"],
                shapes: ["hearts"],
                gravity: randomInRange(0.5, 1),
                scalar: randomInRange(1, 2),
                drift: randomInRange(-0.5, 0.5),
            });

            if (timeLeft > 0) {
                requestAnimationFrame(frame);
            }
        })();
    };

    const openinvite = async (button) => {
        button.disabled = true;
        document.querySelector('body').style.overflowY = 'scroll';
		// window.scrollTo(0, 0);
        AOS.init();
        audio.play();
		 // Fade in the image from the left
        const fadeInImage = document.getElementById('fadeInImage');
        fadeInImage.style.display = 'block';

        // Delay the animation slightly for better effect
        setTimeout(() => {
            fadeInImage.style.opacity = '1';
            // fadeInImage.style.left = '0';
        }, 1000);
        opacity('welcome');
        document.getElementById('music').style.display = 'block';
        timer();

        await confetti({
            origin: { y: 0.8 },
            zIndex: 1057
        });
        await animation();
    };
	
	const download = (url) => {
        const downloadLink = document.createElement('a');
        downloadLink.href = url;
        downloadLink.download = 'card';
        downloadLink.click();
    };

    return {
        openinvite,
        play,
        escapeHtml,
        opacity,
		download,
    };
})();

const audio = (() => {
    let audio = null;

    const singleton = () => {
        if (!audio) {
            audio = new Audio();
            audio.src = document.getElementById('music').getAttribute('data-url');
            audio.load();
            audio.currentTime = 0;
            audio.autoplay = true;
            audio.muted = false;
            audio.loop = true;
            audio.volume = 1;
        }

        return audio;
    };

    return {
        play: () => singleton().play(),
        pause: () => singleton().pause(),
    };
})();
