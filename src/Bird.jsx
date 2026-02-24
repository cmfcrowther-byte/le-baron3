import React, { useEffect, useRef } from 'react';

const Bird = () => {
  const containerRef = useRef(null);
  const frameRef = useRef(1);
  const timeRef = useRef(0);
  const requestRef = useRef(null);
  const directionRef = useRef(1);

  // 1. UNIFIED ENGINE: Assigns IDs first, then animates
  useEffect(() => {
    let requestID;

    // A. SETUP: Assign IDs and Initial State (Run once)
    if (containerRef.current) {
      const svg = containerRef.current.querySelector('svg');
      if (svg) {
        svg.removeAttribute('width');
        svg.removeAttribute('height');
        svg.style.overflow = 'visible';
      }

      // Find frames by structure (Main Layer -> Groups)
      const mainLayer = containerRef.current.querySelector('svg > g');
      if (mainLayer) {
        const rawFrames = mainLayer.querySelectorAll(':scope > g');
        rawFrames.forEach((group, index) => {
          group.id = `frame${index + 1}`; // Force ID assignment
          // Hide all except first to prevent "smear"
          group.style.display = index === 0 ? 'block' : 'none';
        });
      }
    }

    // B. ANIMATION LOOP
    const animate = (time) => {
      if (time - timeRef.current > 85) {
        if (containerRef.current) {
          // Now we can safely look for the IDs we just assigned
          const layers = containerRef.current.querySelectorAll('[id*="frame"]');

          if (layers.length > 0) {
            let next = frameRef.current + directionRef.current;
            if (next > 7) {
              directionRef.current = -1;
              next = 6;
            } else if (next < 1) {
              directionRef.current = 1;
              next = 2;
            }
            frameRef.current = next;

            layers.forEach((el) => {
              // Strict check: only show if ID matches current frame number
              if (el.id === `frame${frameRef.current}`) {
                el.style.display = 'block';
              } else {
                el.style.display = 'none';
              }
            });
          }
        }
        timeRef.current = time;
      }
      requestID = requestAnimationFrame(animate);
    };

    requestID = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(requestID);
  }, []);

  // 2. FLIGHT PATH (CALIBRATED)
  useEffect(() => {
    if (containerRef.current && window.gsap) {
      const tl = window.gsap.timeline({ repeat: -1 });

      tl.fromTo(containerRef.current,
        {
          x: '-500px',
          y: '5vh',     // Flying high (adjust if needed)
          opacity: 1    // START SOLID (No ghosting)
        },
        {
          x: '110vw',
          y: '5vh',     // Stay high
          opacity: 1,   // STAY SOLID
          duration: 8,
          ease: "none"
        }
      );
      return () => tl.kill();
    }
  }, []);



  return (
    <div
      ref={containerRef}
      style={{
        position: 'fixed',
        top: '0',
        left: '0',
        width: '300px',
        zIndex: 9999,
        pointerEvents: 'none',
      }}
      dangerouslySetInnerHTML={{ __html: svgString }}
    />
  );
};

// --- PASTE YOUR RAW INKSCAPE SVG CODE INSIDE THE BACKTICKS BELOW ---
const svgString = `<?xml version="1.0" encoding="UTF-8" standalone="no"?>
<!-- Created with Inkscape (http://www.inkscape.org/) -->

<svg
   width="210mm"
   height="297mm"
   viewBox="0 0 210 297"
   version="1.1"
   id="svg1"
   inkscape:version="1.3.2 (091e20e, 2023-11-25, custom)"
   sodipodi:docname="SundayBird.svg"
   xmlns:inkscape="http://www.inkscape.org/namespaces/inkscape"
   xmlns:sodipodi="http://sodipodi.sourceforge.net/DTD/sodipodi-0.dtd"
   xmlns="http://www.w3.org/2000/svg"
   xmlns:svg="http://www.w3.org/2000/svg">
  <sodipodi:namedview
     id="namedview1"
     pagecolor="#ffffff"
     bordercolor="#000000"
     borderopacity="0.25"
     inkscape:showpageshadow="2"
     inkscape:pageopacity="0.0"
     inkscape:pagecheckerboard="0"
     inkscape:deskcolor="#d1d1d1"
     inkscape:document-units="mm"
     inkscape:zoom="1.4164562"
     inkscape:cx="244.27158"
     inkscape:cy="260.86228"
     inkscape:window-width="1920"
     inkscape:window-height="991"
     inkscape:window-x="-9"
     inkscape:window-y="-9"
     inkscape:window-maximized="1"
     inkscape:current-layer="layer1" />
  <defs
     id="defs1" />
  <g
     inkscape:label="Layer 1"
     inkscape:groupmode="layer"
     id="layer1">
    <g
       id="frame7"
       inkscape:label="frame7"
       transform="translate(158.01286,-77.625798)"
       style="display:inline;stroke:#272398;stroke-opacity:1">
      <path
         style="fill:#ffffff;fill-opacity:1;stroke:#272398;stroke-width:0.2;stroke-dasharray:none;stroke-opacity:1"
         d="m -72.149888,150.38745 c 2.289483,1.0606 6.893281,5.236 8.783151,6.06914 1.889782,0.83318 9.763044,6.04379 11.529465,7.08677 1.766514,1.04293 19.823175,18.26598 20.693446,19.2496 -1.130692,-7.00747 -9.072287,-19.38241 -15.663813,-26.65218 -6.347416,-7.00055 -18.844272,-13.68187 -20.058201,-13.46745 -1.21393,0.21442 -5.284048,7.71412 -5.284048,7.71412 z"
         id="path76-9-5"
         sodipodi:nodetypes="csscssc" />
      <path
         style="fill:none;stroke:#272398;stroke-width:0.2;stroke-dasharray:none;stroke-opacity:1"
         d="m -31.066118,182.9399 c -0.654907,-1.43281 -3.50058,-6.62768 -4.01836,-7.17452 -0.517874,-0.54679 -13.203284,-11.98455 -16.52131,-13.35823 -0.441208,-0.18267 -3.428783,-1.35374 -3.945467,-1.95479"
         id="path62-1-6"
         sodipodi:nodetypes="ccsc" />
      <path
         style="fill:#a7b5ca;fill-opacity:1;stroke:#272398;stroke-width:0.2;stroke-dasharray:none;stroke-opacity:1"
         d="m -34.799438,175.82954 c 0.529346,-1.26752 -2.056634,-4.33755 -2.485374,-4.67099 -0.428834,-0.3334 -11.734158,-8.82942 -14.665574,-9.9332 -1.359213,-0.51187 -3.778158,-1.74748 -4.132471,-2.1382"
         id="path63-1-0"
         sodipodi:nodetypes="cssc" />
      <path
         style="fill:none;stroke:#272398;stroke-width:0.2;stroke-dasharray:none;stroke-opacity:1"
         d="m -37.274436,170.89173 c 0.490183,-0.94623 -2.20375,-3.18908 -2.448267,-3.39393 -0.244695,-0.20475 -12.230829,-7.73851 -12.720782,-7.993 -0.489952,-0.2545 -4.055017,-1.44487 -4.408043,-1.78878"
         id="path64-0-7"
         sodipodi:nodetypes="ccsc" />
      <path
         style="fill:none;stroke:#272398;stroke-width:0.2;stroke-dasharray:none;stroke-opacity:1"
         d="m -39.856541,167.36228 c 0.553854,-0.97427 -2.363933,-3.81414 -2.73804,-4.17197 -0.375073,-0.35724 -9.660115,-5.42149 -11.361298,-5.78521 -1.701182,-0.36372 -4.158955,-1.45289 -4.345518,-1.52354"
         id="path65-5-8"
         sodipodi:nodetypes="ccsc" />
      <path
         style="fill:#a7b5ca;fill-opacity:1;stroke:#272398;stroke-width:0.2;stroke-dasharray:none;stroke-opacity:1"
         d="m -43.192427,162.68554 c 0.653515,-1.21857 -2.681511,-3.81209 -3.183108,-4.17507 -0.501503,-0.36302 -8.369809,-3.46522 -9.824365,-3.45755 -1.454552,0.008 -3.328166,-0.61666 -3.489763,-0.84201"
         id="path66-6-5"
         sodipodi:nodetypes="cssc" />
      <path
         style="fill:none;stroke:#272398;stroke-width:0.2;stroke-dasharray:none;stroke-opacity:1"
         d="m -46.816475,158.20727 c 0.577719,-0.97048 -2.282663,-2.85652 -2.668895,-3.05429 -0.386316,-0.19771 -6.351721,-1.76391 -8.465563,-1.64873 -0.914362,0.0498 -2.152572,0.004 -2.792354,-0.37969"
         id="path67-6-6"
         sodipodi:nodetypes="ccsc" />
      <path
         style="fill:none;stroke:#272398;stroke-width:0.2;stroke-dasharray:none;stroke-opacity:1"
         d="m -50.14771,154.86697 c 0.831849,-1.03707 -1.922707,-2.29784 -2.482021,-2.4069 -0.559408,-0.10902 -6.06379,0.0164 -7.014356,-0.0687 -0.950572,-0.0851 -2.365261,-0.40032 -3.14773,-0.48693"
         id="path68-4-4"
         sodipodi:nodetypes="cssc" />
      <path
         style="fill:none;stroke:#272398;stroke-width:0.2;stroke-dasharray:none;stroke-opacity:1"
         d="m -52.903975,152.37489 c 0.485637,-0.83232 -1.57575,-1.68918 -2.163852,-1.73443 -0.588107,-0.0453 -4.928584,0.93521 -5.636152,0.83661 -0.707573,-0.0986 -2.110421,-0.37061 -2.617139,-0.17948"
         id="path69-0-9"
         sodipodi:nodetypes="cssc" />
      <path
         style="fill:none;stroke:#272398;stroke-width:0.2;stroke-dasharray:none;stroke-opacity:1"
         d="m -55.284536,150.56226 c 0.504068,-0.98026 -1.191769,-1.64566 -1.788424,-1.5385 -0.596567,0.10712 -3.785056,1.28119 -4.427699,1.27339 -0.642556,-0.008 -1.579126,0.0331 -2.121079,-0.0949"
         id="path70-0-7"
         sodipodi:nodetypes="cssc" />
      <path
         style="fill:none;stroke:#272398;stroke-width:0.2;stroke-dasharray:none;stroke-opacity:1"
         d="m -57.38092,149.15262 c 0.367348,-1.01047 -1.774196,-2.09396 -2.262182,-2.00677 -0.48808,0.0872 -2.79298,0.69743 -3.617872,1.24657 -0.824892,0.54913 -1.323643,0.49989 -1.677921,0.49715"
         id="path71-9-7"
         sodipodi:nodetypes="cssc" />
      <path
         style="fill:none;stroke:#272398;stroke-width:0.2;stroke-dasharray:none;stroke-opacity:1"
         d="m -59.892871,147.24344 c -0.01059,-1.05977 -1.755814,-1.52473 -2.30582,-1.48386 -0.550094,0.0409 -3.111999,1.56908 -4.052459,1.87323"
         id="path72-5-5"
         sodipodi:nodetypes="csc" />
      <path
         style="fill:none;stroke:#272398;stroke-width:0.2;stroke-dasharray:none;stroke-opacity:1"
         d="m -62.454564,145.75996 c 0.09952,-0.95025 -1.774128,-1.40422 -2.286873,-1.16735 -0.512718,0.23691 -2.675354,1.70673 -3.318457,2.22911"
         id="path73-3-7"
         sodipodi:nodetypes="csc" />
      <path
         style="fill:none;stroke:#272398;stroke-width:0.2;stroke-dasharray:none;stroke-opacity:1"
         d="m -64.796162,144.51079 c -0.09442,-0.90352 -1.85719,-1.2316 -2.299985,-1.1257 -0.442796,0.10591 -1.566449,1.14003 -2.208493,1.63236 -0.642121,0.49241 -0.233049,0.67203 -0.533645,0.87633"
         id="path74-4-3"
         sodipodi:nodetypes="cssc" />
      <path
         style="fill:none;stroke:#272398;stroke-width:0.2;stroke-dasharray:none;stroke-opacity:1"
         d="m -67.379976,143.41092 c -0.115377,-0.82765 -1.629496,-0.89723 -2.023308,-0.56042 -0.393811,0.33682 -1.551359,1.37055 -1.856203,1.55219 -0.305057,0.18128 -1.826638,0.72871 -1.826638,0.72871"
         id="path75-5-3"
         sodipodi:nodetypes="cscc" />
      <path
         style="fill:#a7b5ca;fill-opacity:1;stroke:#272398;stroke-width:0.2;stroke-dasharray:none;stroke-opacity:1"
         d="m -52.540211,163.07992 c 0.568518,-0.3734 0.951285,-0.44608 0.899099,-0.84552 -0.05227,-0.39938 -0.807536,-2.57997 -0.98214,-2.82149 -0.174958,-0.24131 -1.218884,-1.80872 -1.451671,-2.00585 -0.232791,-0.19714 -1.626689,-2.0687 -2.209972,-2.3585 -0.583277,-0.28979 -1.665992,-1.34283 -1.869076,-1.60862 -0.203178,-0.26575 -0.979839,-0.60422 -1.476807,-1.02694 -0.496879,-0.42277 -1.573777,-1.69051 -1.775613,-2.20096 l -1.738078,-1.72584 c -0.843827,-0.53048 -1.942953,-1.15141 -2.332998,-1.55009 -0.389952,-0.39872 -1.725505,-0.95858 -2.077879,-1.12743 -0.352286,-0.1689 -1.640152,-0.54963 -1.992947,-0.63495 -0.352702,-0.0854 -1.828973,0.1157 -2.336366,-0.85088 -0.50704,-0.9668 -5.143309,2.4485 -5.746617,4.39714 6.696013,0.21132 9.128826,3.36319 14.691541,8.03223 0.98126,0.82365 10.059067,6.0767 10.399524,6.3277 z"
         id="path77-9-5"
         sodipodi:nodetypes="cscssssccsssscsc" />
      <path
         style="fill:none;stroke:#272398;stroke-width:0.2;stroke-dasharray:none;stroke-opacity:1"
         d="m -64.769341,154.61107 c 1.441066,0.91785 3.266977,2.6688 3.956901,2.78057 0.690008,0.11171 1.857283,0.57489 1.700146,0.22755 -0.157231,-0.3473 -0.581849,-1.2067 -0.849568,-1.30818 -0.267101,-0.10187 -1.317421,-0.0594 -1.859587,-0.56755"
         id="path79-0-3" />
      <path
         style="fill:none;stroke:#272398;stroke-width:0.2;stroke-dasharray:none;stroke-opacity:1"
         d="m -60.829464,155.37963 c -0.58098,-0.63918 -0.862851,-0.58035 -1.475812,-0.94128"
         id="path80-7-7" />
      <path
         style="fill:none;stroke:#272398;stroke-width:0.2;stroke-dasharray:none;stroke-opacity:1"
         d="m -64.270736,152.52563 c -1.57734,-1.43259 -1.691333,-1.44041 -1.929489,-1.54505"
         id="path81-6-7" />
      <path
         style="fill:none;stroke:#272398;stroke-width:0.2;stroke-dasharray:none;stroke-opacity:1"
         d="m -67.01228,150.55068 c -0.536734,-0.34791 -0.60198,-0.52227 -1.195566,-0.72251"
         id="path82-3-7" />
      <path
         style="fill:none;stroke:#272398;stroke-width:0.2;stroke-dasharray:none;stroke-opacity:1"
         d="m -69.153736,149.36386 c -0.975859,-0.49659 -1.686696,-0.82759 -2.252867,-0.99398"
         id="path83-0-0" />
      <path
         style="fill:none;stroke:#272398;stroke-width:0.2;stroke-dasharray:none;stroke-opacity:1"
         d="m -71.866926,148.13598 c -0.674381,-0.24319 -3.588501,-1.12255 -5.086427,-1.21463"
         id="path84-0-9" />
      <path
         style="fill:#ffffff;fill-opacity:1;stroke:#272398;stroke-width:0.2;stroke-dasharray:none;stroke-opacity:1"
         d="m -81.045,146.05757 c -2.9928,1.91057 -8.1883,7.59199 -9.545,9.68931 -1.3568,2.09732 -3.0567,8.05887 -4.198,9.75396 -1.1412,1.69509 -5.02,10.24238 -5.9537,12.05239 -0.9338,1.81002 -6.5962,26.35385 -7.56848,28.1368 -2.09829,-2.3366 -1.9054,-24.0378 -0.95244,-29.62886 1.15144,-6.75552 8.6223,-22.94265 11.243034,-25.30124 1.168551,-1.05167 15.899059,-4.24849 16.974586,-4.70236 z"
         id="path76-9"
         sodipodi:nodetypes="cccccssc" />
      <path
         style="fill:#ffffff;fill-opacity:1;stroke:#272398;stroke-width:0.2;stroke-dasharray:none;stroke-opacity:1"
         d="m -105.23718,140.43894 c 0.7731,-0.0102 14.451,3.21482 15.3003,3.10563 4.1684,-1.50859 9.4525,-3.16777 13.4897,-0.53484 3.031,-3.12038 8.6873,-1.83233 10.0542,0.99476 0.6476,1.33944 0.3562,2.33919 0.9337,3.53757 0.6254,1.29767 1.6137,2.22833 1.2312,3.75959 -0.6211,-0.43533 -1.2417,-1.18176 -1.9903,-1.37623 -0.8207,-0.2132 -2.2765,0.67771 -5.3397,0.87037 -0.6821,0.71761 -7.8919,3.8953 -15.5196,0.55269 l -0.1086,-0.13581 c -0.3678,-0.097 -3.6709,-1.54488 -4.2784,-1.79901 -0.6075,-0.25413 -3.5656,0.46361 -4.63469,0.43835 -8.08173,0.11442 -9.71384,-9.40547 -9.13781,-9.41307 z m 10.5056,9.07735 0.2336,-1.09083 c -1.8961,-1.65825 -1.439,-2.33628 -0.8154,-3.17175 0.6235,-0.83548 4.3795,-1.27319 5.2627,-1.51248 0,0 -3.6912,2.04524 -2.492,2.76677 2.4243,-1.74873 10.2575,-3.97537 11.3391,-2.75847 1.6163,1.81834 1.6678,7.46682 -1.4356,7.0722 -3.1034,-0.39462 -9.7487,-2.49151 -7.6425,-3.50514 2.1062,-1.01363 7.859,-2.78101 8.0121,-0.85115 0.1978,2.49152 -3.8857,1.35407 -3.8857,1.35407"
         id="path195-2-1-8"
         sodipodi:nodetypes="sccsscscccscscccccssssc" />
      <path
         style="fill:none;stroke:#272398;stroke-width:0.2;stroke-dasharray:none;stroke-opacity:1"
         d="m -96.3556,149.59358 c -0.7702,-0.22984 -1.4844,-0.76853 -1.4645,-1.20667 0.02,-0.43814 1.7758,-0.13288 2.1868,-0.51715"
         id="path55-3" />
      <path
         style="fill:#a7b5ca;fill-opacity:1;stroke:#272398;stroke-width:0.2;stroke-dasharray:none;stroke-opacity:1"
         d="m -97.7168,148.27282 c -0.6081,0.0241 -2.9135,-0.85706 -2.4718,-1.53509 0.5493,-0.71497 3.2418,0.2411 3.9545,-0.34712"
         id="path56-7"
         sodipodi:nodetypes="ccc" />
      <path
         style="fill:none;stroke:#272398;stroke-width:0.2;stroke-dasharray:none;stroke-opacity:1"
         d="m -100.1463,146.68313 c -0.7054,-0.23616 -2.967,-1.26209 -2.9952,-2.40229 -0.079,-0.85706 4.3492,1.41121 7.336,0.9503"
         id="path57-3"
         sodipodi:nodetypes="ccc" />
      <path
         style="fill:#a7b5ca;fill-opacity:1;stroke:#272398;stroke-width:0.2;stroke-dasharray:none;stroke-opacity:1"
         d="m -103.0568,144.17545 c -0.3866,-0.0965 -2.4281,-1.48049 -2.2856,-2.69815 0.1425,-1.21766 5.1813,2.95036 10.3774,3.09638"
         id="path58-2"
         sodipodi:nodetypes="csc" />
      <path
         style="fill:none;stroke:#272398;stroke-width:0.2;stroke-dasharray:none;stroke-opacity:1"
         d="m -100.97,141.229 c 1.5849,0.76091 4.7405,2.19076 7.2408,2.92252"
         id="path60-3"
         sodipodi:nodetypes="cc" />
      <path
         style="fill:#a7b5ca;fill-opacity:1;stroke:#272398;stroke-width:0.2;stroke-dasharray:none;stroke-opacity:1"
         d="m -76.2154,141.58979 c -0.8959,0.37492 -2.5752,2.01589 -2.5269,2.87523 0.038,0.6776 1.0228,0.65315 1.116,1.20605 0.093,0.55292 -2.2175,-0.66645 -2.0716,1.92499 0.1731,3.07594 2.2618,-0.29256 2.3627,1.08583 0.1009,1.37834 -0.9779,0.75156 -0.8588,1.9425 0.1622,1.62238 2.847,1.90451 3.1908,1.70971 -0.2511,-1.49116 -1.3454,-3.65768 -1.4865,-5.28099 z"
         id="path87"
         sodipodi:nodetypes="csssssccc" />
      <path
         style="fill:#ffffff;fill-opacity:1;stroke:#272398;stroke-width:0.2;stroke-dasharray:none;stroke-opacity:1"
         d="m -65.1171,150.61497 c -0.5971,-0.52617 -4.3431,-1.24614 -4.6475,-0.94759 -0.7091,0.69534 -0.578,-0.82533 -0.2546,-1.46321 1.1035,0.11703 4.9021,2.4108 4.9021,2.4108 z"
         id="path88"
         sodipodi:nodetypes="cscc" />
      <path
         style="fill:#a7b5ca;fill-opacity:1;stroke:#272398;stroke-width:0.2;stroke-dasharray:none;stroke-opacity:1"
         d="m -68.6205,143.83103 c -1.1433,-0.63062 -2.8627,-0.97494 -2.91,-0.72735 -0.047,0.24762 1.8741,0.56485 2.0503,0.82405 0.1762,0.25922 -0.6748,0.47586 -1.0574,0.5726 -0.3825,0.0967 1.5646,0.20504 1.9171,-0.6693 z"
         id="path85" />
      <path
         style="fill:none;fill-opacity:1;stroke:#272398;stroke-width:0.2;stroke-dasharray:none;stroke-opacity:1"
         d="m -65.8342,147.16553 c -1.3583,-0.2206 -5.3772,1.18775 -4.7067,1.09877 0.6706,-0.089 3.9706,1.40544 4.3747,1.58727"
         id="path86"
         sodipodi:nodetypes="csc" />
      <path
         style="fill:none;stroke:#272398;stroke-width:0.2;stroke-dasharray:none;stroke-opacity:1"
         d="m -108.1302,204.9268 c -0.1805,-1.56429 -0.4458,-7.48116 -0.2935,-8.21759 0.1524,-0.73644 4.8702,-17.10561 6.9188,-20.00563 0.2724,-0.38564 2.1501,-2.94066 2.2742,-3.72281"
         id="path62-1"
         sodipodi:nodetypes="ccsc" />
      <path
         style="fill:#a7b5ca;fill-opacity:1;stroke:#272398;stroke-width:0.2;stroke-dasharray:none;stroke-opacity:1"
         d="m -108.6268,196.91236 c -1.0753,-0.80673 -0.4853,-4.77413 -0.2991,-5.28201 0.1863,-0.50789 5.2454,-13.64689 7.1106,-16.11522 0.8648,-1.14456 2.2404,-3.45871 2.3363,-3.97675"
         id="path63-1"
         sodipodi:nodetypes="cssc" />
      <path
         style="fill:none;stroke:#272398;stroke-width:0.2;stroke-dasharray:none;stroke-opacity:1"
         d="m -109.0688,191.40793 c -0.8812,-0.55278 0.2144,-3.87009 0.3132,-4.17228 0.099,-0.30219 6.2048,-12.97395 6.4813,-13.44628 0.2765,-0.47233 2.6214,-3.34443 2.7398,-3.82184"
         id="path64-0"
         sodipodi:nodetypes="ccsc" />
      <path
         style="fill:none;stroke:#272398;stroke-width:0.2;stroke-dasharray:none;stroke-opacity:1"
         d="m -108.7133,187.05027 c -0.9479,-0.54358 0.032,-4.48717 0.1608,-4.98744 0.1299,-0.50026 5.2483,-9.65745 6.4701,-10.85352 1.2218,-1.19607 2.7032,-3.40538 2.8217,-3.56282"
         id="path65-5"
         sodipodi:nodetypes="ccsc" />
      <path
         style="fill:#a7b5ca;fill-opacity:1;stroke:#272398;stroke-width:0.2;stroke-dasharray:none;stroke-opacity:1"
         d="m -108.3129,181.32064 c -1.1532,-0.7003 0.2953,-4.65073 0.5268,-5.22175 0.2314,-0.57101 5.1676,-7.31546 6.3727,-8.06605 1.2051,-0.75058 2.4381,-2.25892 2.4581,-2.53545"
         id="path66-6"
         sodipodi:nodetypes="cssc" />
      <path
         style="fill:none;stroke:#272398;stroke-width:0.2;stroke-dasharray:none;stroke-opacity:1"
         d="m -107.5746,175.61048 c -0.9657,-0.52792 0.447,-3.62721 0.6664,-3.99712 0.2195,-0.3699 4.3575,-4.81234 6.1612,-5.8143 0.7802,-0.43342 1.7798,-1.1169 2.1149,-1.77769"
         id="path67-6"
         sodipodi:nodetypes="ccsc" />
      <path
         style="fill:none;stroke:#272398;stroke-width:0.2;stroke-dasharray:none;stroke-opacity:1"
         d="m -106.5052,171.02439 c -1.2091,-0.4525 0.431,-2.96282 0.838,-3.34708 0.4071,-0.38427 5.016,-3.14239 5.7582,-3.70981 0.7422,-0.56743 1.7518,-1.57299 2.3544,-2.05423"
         id="path68-4"
         sodipodi:nodetypes="cssc" />
      <path
         style="fill:none;stroke:#272398;stroke-width:0.2;stroke-dasharray:none;stroke-opacity:1"
         d="m -105.4836,167.46183 c -0.8201,-0.45789 0.4509,-2.26252 0.9138,-2.60728 0.4629,-0.34477 4.5411,-1.76692 5.0758,-2.21942 0.5347,-0.45251 1.5563,-1.41497 2.071,-1.51553"
         id="path69-0"
         sodipodi:nodetypes="cssc" />
      <path
         style="fill:none;stroke:#272398;stroke-width:0.2;stroke-dasharray:none;stroke-opacity:1"
         d="m -104.4302,164.67498 c -0.9098,-0.57461 0.1557,-2.02549 0.7024,-2.24456 0.5466,-0.21907 3.7709,-0.87628 4.2977,-1.21745 0.5267,-0.34117 1.3208,-0.79368 1.7039,-1.18512"
         id="path70-0"
         sodipodi:nodetypes="cssc" />
      <path
         style="fill:none;stroke:#272398;stroke-width:0.2;stroke-dasharray:none;stroke-opacity:1"
         d="m -103.4086,162.38014 c -0.8121,-0.67157 0.411,-2.71143 0.8579,-2.89099 0.447,-0.17957 2.6577,-0.85832 3.6154,-0.81882 0.9577,0.0395 1.3448,-0.26216 1.636,-0.44891"
         id="path71-9"
         sodipodi:nodetypes="cssc" />
      <path
         style="fill:none;stroke:#272398;stroke-width:0.2;stroke-dasharray:none;stroke-opacity:1"
         d="m -102.2953,159.44246 c -0.5248,-0.91039 0.6824,-2.21583 1.1572,-2.46722 0.4749,-0.25139 3.36,-0.28012 4.2898,-0.50996"
         id="path72-5"
         sodipodi:nodetypes="csc" />
      <path
         style="fill:none;stroke:#272398;stroke-width:0.2;stroke-dasharray:none;stroke-opacity:1"
         d="m -100.9266,156.84237 c -0.5606,-0.75956 0.7582,-2.12246 1.3009,-2.18711 0.5427,-0.0646 3.0687,0.0647 3.8628,0.17598"
         id="path73-3"
         sodipodi:nodetypes="csc" />
      <path
         style="fill:none;stroke:#272398;stroke-width:0.2;stroke-dasharray:none;stroke-opacity:1"
         d="m -99.6217,154.55691 c -0.3769,-0.82061 0.9137,-2.01831 1.3327,-2.15837 0.419,-0.14006 1.8676,0.15803 2.6457,0.24421 0.7782,0.0862 0.5308,0.4525 0.8819,0.47047"
         id="path74-4"
         sodipodi:nodetypes="cssc" />
      <path
         style="fill:none;stroke:#272398;stroke-width:0.2;stroke-dasharray:none;stroke-opacity:1"
         d="m -98.0416,152.27285 c -0.3214,-0.76674 0.894,-1.61429 1.3888,-1.53169 0.4948,0.0826 1.9712,0.36272 2.3144,0.35913 0.3432,-0.004 1.8754,-0.3286 1.8754,-0.3286"
         id="path75-5"
         sodipodi:nodetypes="cscc" />
      <path
         style="fill:#a7b5ca;fill-opacity:1;stroke:#272398;stroke-width:0.2;stroke-dasharray:none;stroke-opacity:1"
         d="m -100.3945,176.79163 c -0.6575,-0.0229 -1.0102,0.11428 -1.1682,-0.25394 -0.1579,-0.36822 -0.632,-2.62324 -0.6094,-2.92035 0.023,-0.29711 0.096,-2.17883 0.189,-2.46832 0.093,-0.2895 0.3019,-2.61308 0.6377,-3.16414 0.3358,-0.55105 0.6998,-2.01376 0.7337,-2.34642 0.034,-0.33267 0.505,-1.02594 0.7026,-1.64556 0.1975,-0.61962 0.4486,-2.26263 0.3583,-2.80353 l 0.5665,-2.37832 c 0.4298,-0.89218 1.0249,-1.99448 1.1463,-2.53792 0.1213,-0.54343 0.9424,-1.71665 1.1484,-2.04424 0.2059,-0.32759 1.0778,-1.32304 1.3262,-1.57953 0.2483,-0.25648 1.5687,-0.85324 1.5011,-1.94266 -0.068,-1.08942 5.4803,-0.58658 6.9596,0.76323 -5.4235,3.66587 -5.8458,7.62343 -8.0891,14.5056 -0.3957,1.21404 -5.2479,10.42457 -5.4027,10.8161 z"
         id="path77-9"
         sodipodi:nodetypes="cscssssccsssscsc" />
      <path
         style="fill:none;stroke:#272398;stroke-width:0.2;stroke-dasharray:none;stroke-opacity:1"
         d="m -94.5588,163.19496 c -0.728,1.53382 -1.3544,3.97929 -1.8679,4.43385 -0.5136,0.45455 -1.2444,1.45763 -1.2895,1.07926 -0.045,-0.37838 -0.127,-1.3332 0.043,-1.55921 0.1693,-0.22601 1.0581,-0.73644 1.25,-1.45256"
         id="path79-0" />
      <path
         style="fill:none;stroke:#272398;stroke-width:0.2;stroke-dasharray:none;stroke-opacity:1"
         d="m -97.4256,165.902 c 0.158,-0.84818 0.4204,-0.94467 0.7449,-1.57191"
         id="path80-7" />
      <path
         style="fill:none;stroke:#272398;stroke-width:0.2;stroke-dasharray:none;stroke-opacity:1"
         d="m -96.0205,161.67385 c 0.5814,-2.04425 0.6716,-2.11027 0.8156,-2.32358"
         id="path81-6" />
      <path
         style="fill:none;stroke:#272398;stroke-width:0.2;stroke-dasharray:none;stroke-opacity:1"
         d="m -94.7507,158.56051 c 0.2681,-0.57645 0.2342,-0.75929 0.6236,-1.23924"
         id="path82-3" />
      <path
         style="fill:none;stroke:#272398;stroke-width:0.2;stroke-dasharray:none;stroke-opacity:1"
         d="m -93.5797,156.43246 c 0.5559,-0.93197 0.9763,-1.5846 1.3601,-2.02138"
         id="path83-0" />
      <path
         style="fill:none;stroke:#272398;stroke-width:0.2;stroke-dasharray:none;stroke-opacity:1"
         d="m -91.9572,153.97176 c 0.4345,-0.55868 2.3984,-2.82639 3.5891,-3.68472"
         id="path84-0" />
      <rect
         style="fill:none;stroke:none;stroke-width:0.2"
         id="rect1-6"
         width="156.64949"
         height="128.91223"
         x="-158.01286"
         y="77.625801"
         sodipodi:insensitive="true" />
    </g>
    <g
       id="frame6"
       inkscape:label="frame6"
       transform="translate(156.95452,-28.413259)"
       style="display:inline;stroke:#272398;stroke-opacity:1">
      <path
         style="fill:#ffffff;fill-opacity:1;stroke:#272398;stroke-width:0.2;stroke-dasharray:none;stroke-opacity:1"
         d="m -70.58467,102.38927 c 2.446037,0.61928 7.742096,3.87208 9.753369,4.34165 2.011197,0.46964 10.711705,4.13568 12.640431,4.8343 1.928809,0.69855 22.857037,14.28846 23.894077,15.09433 -2.811628,-5.89998 -18.127563,-23.04316 -21.882803,-25.06481 -3.755241,-2.021645 -21.351548,-8.862579 -22.939867,-8.423534 -1.588319,0.439045 -1.465207,9.218064 -1.465207,9.218064 z"
         id="path76-9-5-0"
         sodipodi:nodetypes="cssc" />
      <path
         style="fill:none;stroke:#272398;stroke-width:0.2;stroke-dasharray:none;stroke-opacity:1"
         d="m -24.193271,126.7896 c -0.908386,-1.28711 -4.664976,-5.8667 -5.274885,-6.30844 -0.609992,-0.44168 -15.190448,-9.33845 -18.705166,-10.07535 -0.467366,-0.098 -3.619887,-0.69686 -4.238736,-1.19209"
         id="path62-1-6-3"
         sodipodi:nodetypes="ccsc" />
      <path
         style="fill:#a7b5ca;fill-opacity:1;stroke:#272398;stroke-width:0.2;stroke-dasharray:none;stroke-opacity:1"
         d="m -29.176169,120.49154 c 0.286015,-1.34351 -2.822719,-3.88283 -3.305691,-4.13131 -0.483055,-0.24841 -13.163609,-6.5091 -16.248502,-7.0522 -1.430391,-0.25189 -4.036001,-1.01926 -4.456409,-1.33777"
         id="path63-1-0-3"
         sodipodi:nodetypes="cssc" />
      <path
         style="fill:none;stroke:#272398;stroke-width:0.2;stroke-dasharray:none;stroke-opacity:1"
         d="m -32.520965,116.09609 c 0.306895,-1.0205 -2.755085,-2.72694 -3.033245,-2.88308 -0.278314,-0.15601 -13.450146,-5.34521 -13.978687,-5.50479 -0.528541,-0.15958 -4.252173,-0.67069 -4.66267,-0.94345"
         id="path64-0-7-5"
         sodipodi:nodetypes="ccsc" />
      <path
         style="fill:none;stroke:#272398;stroke-width:0.2;stroke-dasharray:none;stroke-opacity:1"
         d="m -35.710784,113.10455 c 0.364289,-1.05983 -3.028009,-3.31164 -3.461796,-3.59419 -0.434625,-0.28178 -10.495557,-3.54311 -12.234654,-3.58622 -1.739097,-0.0431 -4.355803,-0.65936 -4.552209,-0.69433"
         id="path65-5-8-7"
         sodipodi:nodetypes="ccsc" />
      <path
         style="fill:#a7b5ca;fill-opacity:1;stroke:#272398;stroke-width:0.2;stroke-dasharray:none;stroke-opacity:1"
         d="m -39.853403,109.12476 c 0.417091,-1.31835 -3.339739,-3.25095 -3.89977,-3.51499 -0.559948,-0.2641 -8.865988,-1.85895 -10.29408,-1.58265 -1.428086,0.27632 -3.3848,0.009 -3.585254,-0.18266"
         id="path66-6-5-1"
         sodipodi:nodetypes="cssc" />
      <path
         style="fill:none;stroke:#272398;stroke-width:0.2;stroke-dasharray:none;stroke-opacity:1"
         d="m -44.242547,105.39327 c 0.388444,-1.06052 -2.771188,-2.38553 -3.187314,-2.50853 -0.416196,-0.12292 -6.56828,-0.55985 -8.624437,-0.0561 -0.889413,0.21791 -2.114732,0.40187 -2.814429,0.14283"
         id="path67-6-6-3"
         sodipodi:nodetypes="ccsc" />
      <path
         style="fill:none;stroke:#272398;stroke-width:0.2;stroke-dasharray:none;stroke-opacity:1"
         d="m -48.133644,102.72605 c 0.625893,-1.17293 -2.314196,-1.90299 -2.884031,-1.90683 -0.569919,-0.004 -5.956347,1.13656 -6.906262,1.22861 -0.949921,0.0921 -2.398501,0.0436 -3.183499,0.10311"
         id="path68-4-4-9"
         sodipodi:nodetypes="cssc" />
      <path
         style="fill:none;stroke:#272398;stroke-width:0.2;stroke-dasharray:none;stroke-opacity:1"
         d="m -51.302936,100.78619 c 0.323475,-0.90773 -1.860746,-1.368927 -2.447082,-1.304729 -0.586343,0.06419 -4.670901,1.829829 -5.384504,1.863669 -0.713611,0.0338 -2.14256,0.0257 -2.605234,0.30721"
         id="path69-0-9-6"
         sodipodi:nodetypes="cssc" />
      <path
         style="fill:none;stroke:#272398;stroke-width:0.2;stroke-dasharray:none;stroke-opacity:1"
         d="m -53.977444,99.444655 c 0.314253,-1.05652 -1.475336,-1.397107 -2.041914,-1.181535 -0.566501,0.215504 -3.483135,1.95853 -4.116153,2.06962 -0.632941,0.11102 -1.545809,0.32436 -2.102092,0.29865"
         id="path70-0-7-5"
         sodipodi:nodetypes="cssc" />
      <path
         style="fill:none;stroke:#272398;stroke-width:0.2;stroke-dasharray:none;stroke-opacity:1"
         d="m -56.298205,98.44666 c 0.174306,-1.060946 -2.130569,-1.730057 -2.59404,-1.554195 -0.463555,0.175924 -2.616012,1.20151 -3.325228,1.893614 -0.709217,0.692103 -1.208479,0.735867 -1.557162,0.798638"
         id="path71-9-7-4"
         sodipodi:nodetypes="cssc" />
      <path
         style="fill:none;stroke:#272398;stroke-width:0.2;stroke-dasharray:none;stroke-opacity:1"
         d="m -59.119682,97.034521 c -0.206233,-1.03956 -2.00732,-1.17403 -2.540301,-1.032227 -0.533058,0.141872 -2.768472,2.117101 -3.636536,2.589789"
         id="path72-5-5-1"
         sodipodi:nodetypes="csc" />
      <path
         style="fill:none;stroke:#272398;stroke-width:0.2;stroke-dasharray:none;stroke-opacity:1"
         d="m -61.911381,96.049941 c -0.07778,-0.952274 -2.003051,-1.052204 -2.463197,-0.724672 -0.460113,0.327569 -2.313909,2.1717 -2.849412,2.803918"
         id="path73-3-7-7"
         sodipodi:nodetypes="csc" />
      <path
         style="fill:none;stroke:#272398;stroke-width:0.2;stroke-dasharray:none;stroke-opacity:1"
         d="m -64.44348,95.254967 c -0.25975,-0.870505 -2.052786,-0.867214 -2.468387,-0.681313 -0.415602,0.185902 -1.328818,1.409844 -1.86883,2.012341 -0.540076,0.60258 -0.104858,0.703518 -0.362527,0.959841"
         id="path74-4-3-2"
         sodipodi:nodetypes="cssc" />
      <path
         style="fill:none;stroke:#272398;stroke-width:0.2;stroke-dasharray:none;stroke-opacity:1"
         d="m -67.186036,94.65148 c -0.266325,-0.792075 -1.767228,-0.580677 -2.09202,-0.176893 -0.324793,0.403785 -1.271391,1.633615 -1.537423,1.868452 -0.266305,0.234533 -1.660528,1.053696 -1.660528,1.053696"
         id="path75-5-3-2"
         sodipodi:nodetypes="cscc" />
      <path
         style="fill:#ffffff;fill-opacity:1;stroke:#272398;stroke-width:0.2;stroke-dasharray:none;stroke-opacity:1"
         d="m -74.766418,102.70202 c -3.546663,-0.16826 -11.069095,1.47027 -13.387812,2.39921 -2.318799,0.92889 -7.149031,4.81458 -9.059628,5.53951 -1.910515,0.72498 -10.012772,5.46362 -11.820232,6.40224 -1.80755,0.93858 -20.82172,17.01501 -21.75073,17.9415 1.2525,-5.15812 10.91856,-18.81957 13.93637,-22.0052 3.0178,-3.18563 19.933402,-14.600796 21.918801,-15.376782 1.985399,-0.775987 19.088366,3.572532 20.163231,5.099522 z"
         id="path76-9-59" />
      <path
         style="fill:#a7b5ca;fill-opacity:1;stroke:#272398;stroke-width:0.2;stroke-dasharray:none;stroke-opacity:1"
         d="m -48.967338,111.23965 c 0.489729,-0.47202 0.852475,-0.61418 0.727379,-0.99709 -0.125173,-0.38285 -1.270362,-2.38632 -1.486589,-2.59143 -0.216534,-0.20482 -1.532113,-1.55234 -1.797317,-1.70306 -0.265211,-0.15073 -1.980935,-1.73249 -2.607724,-1.90952 -0.626782,-0.17703 -1.885433,-1.01186 -2.134135,-1.23555 -0.248785,-0.22364 -1.074614,-0.41276 -1.641135,-0.73637 -0.566443,-0.32367 -1.859052,-1.37059 -2.151733,-1.83495 l -2.027053,-1.374961 c -0.927319,-0.365419 -2.122254,-0.772556 -2.579251,-1.092298 -0.456914,-0.319803 -1.87292,-0.623232 -2.250426,-0.72406 -0.37743,-0.100897 -1.713469,-0.237095 -2.075955,-0.255756 -0.362403,-0.01872 -1.776099,0.451664 -2.453361,-0.404512 -0.676955,-0.856452 -4.6023,3.356725 -4.835143,5.383297 6.619751,-1.02963 9.593081,1.61843 15.922756,5.17917 1.116558,0.62815 11.008712,4.11333 11.389687,4.29709 z"
         id="path77-9-5-3"
         sodipodi:nodetypes="cscssssccsssscsc" />
      <path
         style="fill:none;stroke:#272398;stroke-width:0.2;stroke-dasharray:none;stroke-opacity:1"
         d="m -62.55077,105.17636 c 1.585853,0.63577 3.703864,2.01917 4.402562,2.00153 0.698768,-0.0177 1.931529,0.2218 1.712915,-0.0905 -0.218697,-0.31226 -0.794805,-1.0784 -1.076667,-1.12867 -0.281324,-0.0508 -1.305704,0.18509 -1.932437,-0.21416"
         id="path79-0-3-6" />
      <path
         style="fill:none;stroke:#272398;stroke-width:0.2;stroke-dasharray:none;stroke-opacity:1"
         d="m -58.536723,105.20367 c -0.689085,-0.52082 -0.955232,-0.41092 -1.62433,-0.65237"
         id="path80-7-7-0" />
      <path
         style="fill:none;stroke:#272398;stroke-width:0.2;stroke-dasharray:none;stroke-opacity:1"
         d="m -62.446104,103.0347 c -1.814893,-1.11645 -1.928369,-1.10308 -2.181759,-1.16191"
         id="path81-6-7-5" />
      <path
         style="fill:none;stroke:#272398;stroke-width:0.2;stroke-dasharray:none;stroke-opacity:1"
         d="m -65.505371,101.60035 c -0.59178,-0.24274 -0.688121,-0.40204 -1.308486,-0.48915"
         id="path82-3-7-7" />
      <path
         style="fill:none;stroke:#272398;stroke-width:0.2;stroke-dasharray:none;stroke-opacity:1"
         d="m -67.829254,100.82967 c -1.050816,-0.30772 -1.810574,-0.50167 -2.397742,-0.56058"
         id="path83-0-0-4" />
      <path
         style="fill:none;stroke:#272398;stroke-width:0.2;stroke-dasharray:none;stroke-opacity:1"
         d="m -70.722611,100.12428 c -0.707706,-0.11438 -3.734133,-0.440124 -5.223279,-0.253828"
         id="path84-0-9-0" />
      <path
         style="fill:#ffffff;fill-opacity:1;stroke:#272398;stroke-width:0.2;stroke-dasharray:none;stroke-opacity:1"
         d="m -105.23963,91.692114 c 0.7731,-0.0102 14.450994,3.21482 15.300294,3.10563 4.1684,-1.50859 9.4525,-3.16777 13.4897,-0.53484 3.031,-3.12038 8.6873,-1.83233 10.0542,0.99476 0.6476,1.33944 0.3562,2.33919 0.9337,3.53757 0.6254,1.297666 1.6137,2.228336 1.2312,3.759596 -0.6211,-0.43533 -1.2417,-1.18176 -1.9903,-1.37623 -0.8207,-0.2132 -2.2765,0.67771 -5.3397,0.87037 -0.6821,0.71761 -7.8919,3.8953 -15.5196,0.55269 l -0.1086,-0.13581 c -0.3678,-0.097 -3.6709,-1.54488 -4.2784,-1.79901 -0.6075,-0.25414 -3.5656,0.46361 -4.63469,0.43835 -8.081724,0.11442 -9.713834,-9.405476 -9.137804,-9.413076 z m 10.505594,9.077356 0.2336,-1.090836 c -1.8961,-1.65825 -1.439,-2.33628 -0.8154,-3.17175 0.6235,-0.83548 4.3795,-1.27319 5.2627,-1.51248 0,0 -3.6912,2.04524 -2.492,2.76677 2.4243,-1.74873 10.2575,-3.97537 11.3391,-2.75847 1.6163,1.81834 1.6678,7.466826 -1.4356,7.072206 -3.1034,-0.39462 -9.7487,-2.491516 -7.6425,-3.505146 2.1062,-1.01363 7.859,-2.78101 8.0121,-0.85115 0.1978,2.491516 -3.8857,1.35407 -3.8857,1.35407"
         id="path195-2-1-1"
         sodipodi:nodetypes="sccsscscccscscccccssssc" />
      <path
         style="fill:none;stroke:#272398;stroke-width:0.2;stroke-dasharray:none;stroke-opacity:1"
         d="m -96.1232,100.65514 c -0.7702,-0.22984 -1.4844,-0.76853 -1.4645,-1.20667 0.02,-0.43814 1.7758,-0.13288 2.1868,-0.51715"
         id="path55-3-0" />
      <path
         style="fill:#a7b5ca;fill-opacity:1;stroke:#272398;stroke-width:0.2;stroke-dasharray:none;stroke-opacity:1"
         d="m -97.4844,99.33438 c -0.6081,0.0241 -2.9135,-0.85706 -2.4718,-1.53509 0.5493,-0.71497 3.2418,0.2411 3.9545,-0.34712"
         id="path56-7-0"
         sodipodi:nodetypes="ccc" />
      <path
         style="fill:none;stroke:#272398;stroke-width:0.2;stroke-dasharray:none;stroke-opacity:1"
         d="m -99.9139,97.74469 c -0.7054,-0.23616 -2.967,-1.26209 -2.9952,-2.40229 -0.079,-0.85706 4.3492,1.41121 7.336,0.9503"
         id="path57-3-9"
         sodipodi:nodetypes="ccc" />
      <path
         style="fill:#a7b5ca;fill-opacity:1;stroke:#272398;stroke-width:0.2;stroke-dasharray:none;stroke-opacity:1"
         d="m -102.8244,95.23701 c -0.3866,-0.0965 -2.4281,-1.48049 -2.2856,-2.69815 0.1425,-1.21766 5.1813,2.95036 10.3774,3.09638"
         id="path58-2-8"
         sodipodi:nodetypes="csc" />
      <path
         style="fill:none;stroke:#272398;stroke-width:0.2;stroke-dasharray:none;stroke-opacity:1"
         d="m -100.7376,92.29056 c 1.5849,0.76091 4.7405,2.19076 7.2408,2.92252"
         id="path60-3-1"
         sodipodi:nodetypes="cc" />
      <path
         style="fill:#a7b5ca;fill-opacity:1;stroke:#272398;stroke-width:0.2;stroke-dasharray:none;stroke-opacity:1"
         d="m -75.983,92.65135 c -0.8959,0.37492 -2.5752,2.01589 -2.5269,2.87523 0.038,0.6776 1.0228,0.65315 1.116,1.20605 0.093,0.55292 -2.2175,-0.66645 -2.0716,1.92499 0.1731,3.07594 2.2618,-0.29256 2.3627,1.08583 0.1009,1.37834 -0.9779,0.75156 -0.8588,1.9425 0.1622,1.62238 2.847,1.90451 3.1908,1.70971 -0.2511,-1.49116 -1.3454,-3.65768 -1.4865,-5.28099 z"
         id="path87-5"
         sodipodi:nodetypes="csssssccc" />
      <path
         style="fill:#ffffff;fill-opacity:1;stroke:#272398;stroke-width:0.2;stroke-dasharray:none;stroke-opacity:1"
         d="m -64.8847,101.67653 c -0.5971,-0.52617 -4.3431,-1.24614 -4.6475,-0.94759 -0.7091,0.69534 -0.578,-0.82533 -0.2546,-1.46321 1.1035,0.11703 4.9021,2.4108 4.9021,2.4108 z"
         id="path88-6"
         sodipodi:nodetypes="cscc" />
      <path
         style="fill:#a7b5ca;fill-opacity:1;stroke:#272398;stroke-width:0.2;stroke-dasharray:none;stroke-opacity:1"
         d="m -68.3881,94.89259 c -1.1433,-0.63062 -2.8627,-0.97494 -2.91,-0.72735 -0.047,0.24762 1.8741,0.56485 2.0503,0.82405 0.1762,0.25922 -0.6748,0.47586 -1.0574,0.5726 -0.3825,0.0967 1.5646,0.20504 1.9171,-0.6693 z"
         id="path85-4" />
      <path
         style="fill:none;fill-opacity:1;stroke:#272398;stroke-width:0.2;stroke-dasharray:none;stroke-opacity:1"
         d="m -65.6018,98.22709 c -1.3583,-0.2206 -5.3772,1.18775 -4.7067,1.09877 0.6706,-0.089 3.9706,1.40544 4.3747,1.58727"
         id="path86-7"
         sodipodi:nodetypes="csc" />
      <path
         style="fill:none;stroke:#272398;stroke-width:0.2;stroke-dasharray:none;stroke-opacity:1"
         d="m -130.87262,135.12559 c 0.7559,-1.38137 3.95586,-6.36535 4.50544,-6.87866 0.54966,-0.51326 13.85348,-11.15355 17.20059,-12.33833 0.44508,-0.15756 3.45345,-1.15935 4.00641,-1.72627"
         id="path62-1-3"
         sodipodi:nodetypes="ccsc" />
      <path
         style="fill:#a7b5ca;fill-opacity:1;stroke:#272398;stroke-width:0.2;stroke-dasharray:none;stroke-opacity:1"
         d="m -126.65031,128.29552 c -0.41209,-1.27956 2.3605,-4.17803 2.80578,-4.48516 0.44537,-0.30709 12.16265,-8.11306 15.11076,-9.05129 1.36696,-0.43511 3.82631,-1.53017 4.20374,-1.89774"
         id="path63-1-5"
         sodipodi:nodetypes="cssc" />
      <path
         style="fill:none;stroke:#272398;stroke-width:0.2;stroke-dasharray:none;stroke-opacity:1"
         d="m -123.83277,123.54625 c -0.40026,-0.96014 2.40974,-3.03591 2.6649,-3.22558 0.25532,-0.18955 12.55738,-7.00965 13.05586,-7.23562 0.49848,-0.22598 4.07138,-1.21687 4.44372,-1.53828"
         id="path64-0-5"
         sodipodi:nodetypes="ccsc" />
      <path
         style="fill:none;stroke:#272398;stroke-width:0.2;stroke-dasharray:none;stroke-opacity:1"
         d="m -121.02629,120.19375 c -0.46003,-0.99115 2.61714,-3.64504 3.01117,-3.97911 0.39492,-0.33342 9.86141,-4.85423 11.54958,-5.12526 1.68817,-0.27102 4.17337,-1.21939 4.36103,-1.2795"
         id="path65-5-4"
         sodipodi:nodetypes="ccsc" />
      <path
         style="fill:#a7b5ca;fill-opacity:1;stroke:#272398;stroke-width:0.2;stroke-dasharray:none;stroke-opacity:1"
         d="m -117.39094,115.74704 c -0.53715,-1.23765 2.92655,-3.62654 3.44528,-3.95907 0.51864,-0.33258 8.4432,-2.98874 9.8605,-2.90569 1.4173,0.0831 3.29493,-0.43645 3.47094,-0.65067"
         id="path66-6-55"
         sodipodi:nodetypes="cssc" />
      <path
         style="fill:none;stroke:#272398;stroke-width:0.2;stroke-dasharray:none;stroke-opacity:1"
         d="m -113.49096,111.51134 c -0.4836,-0.98864 2.4594,-2.7033 2.85213,-2.87862 0.39279,-0.17526 6.33642,-1.41286 8.38759,-1.18939 0.88726,0.0966 2.09804,0.11582 2.753184,-0.23018"
         id="path67-6-3"
         sodipodi:nodetypes="ccsc" />
      <path
         style="fill:none;stroke:#272398;stroke-width:0.2;stroke-dasharray:none;stroke-opacity:1"
         d="m -109.96972,108.38456 c -0.72588,-1.06761 2.0627,-2.1701 2.61687,-2.24881 0.55426,-0.0787 5.90978,0.3308 6.84339,0.2961 0.933608,-0.0347 2.338526,-0.27272 3.108395,-0.31767"
         id="path68-4-8"
         sodipodi:nodetypes="cssc" />
      <path
         style="fill:none;stroke:#272398;stroke-width:0.2;stroke-dasharray:none;stroke-opacity:1"
         d="m -107.07852,106.06584 c -0.40517,-0.84739 1.67457,-1.58686 2.25158,-1.60104 0.57701,-0.0142 4.72781,1.17957 5.425646,1.11888 0.697843,-0.0607 2.087671,-0.25659 2.56596,-0.0415"
         id="path69-0-5"
         sodipodi:nodetypes="cssc" />
      <path
         style="fill:none;stroke:#272398;stroke-width:0.2;stroke-dasharray:none;stroke-opacity:1"
         d="m -104.60928,104.3988 c -0.411,-0.99448 1.29669,-1.56379 1.86954,-1.42697 0.57276,0.13676 3.584708,1.46199 4.211811,1.48763 0.627021,0.0256 1.536649,0.11468 2.075456,0.0163"
         id="path70-0-1"
         sodipodi:nodetypes="cssc" />
      <path
         style="fill:none;stroke:#272398;stroke-width:0.2;stroke-dasharray:none;stroke-opacity:1"
         d="m -102.4501,103.11509 c -0.27525,-1.01722 1.90121,-1.9764 2.36976,-1.86495 0.468641,0.11151 2.665478,0.83386 3.424576,1.41912 0.759098,0.58525 1.24933,0.56248 1.594912,0.57816"
         id="path71-9-5"
         sodipodi:nodetypes="cssc" />
      <path
         style="fill:none;stroke:#272398;stroke-width:0.2;stroke-dasharray:none;stroke-opacity:1"
         d="m -99.844858,101.3595 c 0.09722,-1.04632 1.836621,-1.415061 2.369427,-1.34614 0.532888,0.069 2.904994,1.71145 3.796838,2.06069"
         id="path72-5-8"
         sodipodi:nodetypes="csc" />
      <path
         style="fill:none;stroke:#272398;stroke-width:0.2;stroke-dasharray:none;stroke-opacity:1"
         d="m -97.226031,100.027 c -0.01911,-0.943841 1.844593,-1.295059 2.325007,-1.034472 0.480385,0.260628 2.468056,1.824772 3.052137,2.374162"
         id="path73-3-77"
         sodipodi:nodetypes="csc" />
      <path
         style="fill:none;stroke:#272398;stroke-width:0.2;stroke-dasharray:none;stroke-opacity:1"
         d="m -94.840968,98.914541 c 0.166126,-0.887613 1.91141,-1.120238 2.334374,-0.992647 0.422964,0.127591 1.433536,1.207426 2.019047,1.727083 0.585581,0.519733 0.172082,0.675943 0.448358,0.893343"
         id="path74-4-0"
         sodipodi:nodetypes="cssc" />
      <path
         style="fill:none;stroke:#272398;stroke-width:0.2;stroke-dasharray:none;stroke-opacity:1"
         d="m -92.232029,97.962131 c 0.180332,-0.811584 1.662034,-0.801754 2.018314,-0.448605 0.35628,0.353149 1.399926,1.434365 1.682202,1.629607 0.282513,0.194907 1.720898,0.814624 1.720898,0.814624"
         id="path75-5-4"
         sodipodi:nodetypes="cscc" />
      <path
         style="fill:#a7b5ca;fill-opacity:1;stroke:#272398;stroke-width:0.2;stroke-dasharray:none;stroke-opacity:1"
         d="m -108.31085,116.62166 c -0.52359,-0.39835 -0.89076,-0.49001 -0.80714,-0.88187 0.0837,-0.39181 0.99874,-2.50666 1.18875,-2.73618 0.19034,-0.2293 1.3365,-1.72346 1.57959,-1.90611 0.24309,-0.18266 1.75534,-1.9591 2.3477,-2.21511 0.59236,-0.256 1.73415,-1.24004 1.95391,-1.49206 0.21986,-0.25197 1.00471,-0.54602 1.52383,-0.9378 0.51903,-0.39185 1.672758,-1.58828 1.911363,-2.08203 l 1.835822,-1.61465 c 0.866076,-0.48023 1.988439,-1.03657 2.401352,-1.41016 0.412826,-0.37364 1.760656,-0.85738 2.118002,-1.00588 0.357265,-0.14857 1.643921,-0.457838 1.99483,-0.523814 0.350821,-0.06603 1.773436,0.209194 2.347306,-0.719293 0.573543,-0.928714 4.813054,2.685567 5.2414,4.641797 -6.544747,-0.13871 -9.174734,2.84856 -14.980212,7.17211 -1.024086,0.76271 -10.304043,5.48078 -10.656503,5.71105 z"
         id="path77-9-1"
         sodipodi:nodetypes="cscssssccsssscsc" />
      <path
         style="fill:none;stroke:#272398;stroke-width:0.2;stroke-dasharray:none;stroke-opacity:1"
         d="m -95.695251,108.89046 c -1.480039,0.83191 -3.40354,2.4668 -4.085258,2.54141 -0.681791,0.0746 -1.857661,0.47152 -1.676001,0.13656 0.18175,-0.33491 0.66614,-1.16181 0.93544,-1.24817 0.26873,-0.0868 1.28912,0.01 1.859303,-0.46415"
         id="path79-0-4" />
      <path
         style="fill:none;stroke:#272398;stroke-width:0.2;stroke-dasharray:none;stroke-opacity:1"
         d="m -99.598946,109.44524 c 0.61876,-0.60126 0.888711,-0.52852 1.515832,-0.85325"
         id="path80-7-3" />
      <path
         style="fill:none;stroke:#272398;stroke-width:0.2;stroke-dasharray:none;stroke-opacity:1"
         d="m -96.010313,106.80454 c 1.655085,-1.33329 1.76685,-1.33511 2.007589,-1.42612"
         id="path81-6-5" />
      <path
         style="fill:none;stroke:#272398;stroke-width:0.2;stroke-dasharray:none;stroke-opacity:1"
         d="m -93.175867,104.9959 c 0.551746,-0.31583 0.629645,-0.48469 1.224704,-0.65169"
         id="path82-3-1" />
      <path
         style="fill:none;stroke:#272398;stroke-width:0.2;stroke-dasharray:none;stroke-opacity:1"
         d="m -90.991019,103.93463 c 0.992005,-0.4399 1.712083,-0.72999 2.277643,-0.86498"
         id="path83-0-9" />
      <path
         style="fill:none;stroke:#272398;stroke-width:0.2;stroke-dasharray:none;stroke-opacity:1"
         d="m -88.245467,102.86249 c 0.677342,-0.20524 3.59019,-0.92268 5.057951,-0.93591"
         id="path84-0-6" />
      <rect
         style="fill:none;stroke:none;stroke-width:0.2;stroke-opacity:1"
         id="rect1-8"
         width="156.64949"
         height="128.91223"
         x="-156.95451"
         y="28.41326" />
    </g>
    <g
       id="frame5"
       inkscape:label="frame5"
       transform="translate(158.01286,7.5700915)"
       style="display:inline;stroke:#272398;stroke-opacity:1">
      <path
         style="fill:#ffffff;fill-opacity:1;stroke:#272398;stroke-width:0.2;stroke-dasharray:none;stroke-opacity:1"
         d="m -69.552685,64.48502 c 2.518867,-0.148006 8.54979,1.354313 10.608984,1.194826 2.059142,-0.159397 11.460434,0.709167 13.510075,0.79296 2.049701,0.08371 26.104017,6.721952 27.335948,7.177176 -2.836312,-3.370684 -19.207345,-14.275336 -32.708057,-17.185286 -13.500713,-2.909949 -19.388839,-0.837249 -20.31914,-0.275679 -0.930302,0.561569 1.57219,8.296003 1.57219,8.296003 z"
         id="path76-9-5-0-8"
         sodipodi:nodetypes="cssc" />
      <path
         style="fill:none;stroke:#272398;stroke-width:0.2;stroke-dasharray:none;stroke-opacity:1"
         d="m -17.959728,73.74271 c -1.254554,-0.952851 -6.218346,-4.184778 -6.933151,-4.421796 -0.714866,-0.236934 -17.300812,-4.317201 -20.874013,-3.958728 -0.475148,0.04765 -3.661375,0.428399 -4.400848,0.143091"
         id="path62-1-6-3-7"
         sodipodi:nodetypes="ccsc" />
      <path
         style="fill:#a7b5ca;fill-opacity:1;stroke:#272398;stroke-width:0.2;stroke-dasharray:none;stroke-opacity:1"
         d="m -24.61138,69.242668 c -0.132897,-1.36717 -3.863155,-2.849581 -4.398604,-2.940671 -0.53551,-0.09101 -14.514427,-2.231706 -17.61935,-1.818218 -1.4397,0.191654 -4.1554,0.246653 -4.652347,0.06991"
         id="path63-1-0-3-7"
         sodipodi:nodetypes="cssc" />
      <path
         style="fill:none;stroke:#272398;stroke-width:0.2;stroke-dasharray:none;stroke-opacity:1"
         d="m -29.127002,66.061984 c -0.01549,-1.065544 -3.449747,-1.768043 -3.762066,-1.832932 -0.312423,-0.06471 -14.436246,-1.035607 -14.988301,-1.028186 -0.552055,0.0074 -4.256264,0.644218 -4.729949,0.508101"
         id="path64-0-7-5-0"
         sodipodi:nodetypes="ccsc" />
      <path
         style="fill:none;stroke:#272398;stroke-width:0.2;stroke-dasharray:none;stroke-opacity:1"
         d="m -33.071078,64.17292 c 0.02736,-1.120358 -3.886441,-2.24307 -4.385284,-2.381487 -0.49941,-0.137431 -11.07549,-0.209491 -12.746468,0.274397 -1.670978,0.483889 -4.351641,0.686298 -4.54944,0.712252"
         id="path65-5-8-7-9"
         sodipodi:nodetypes="ccsc" />
      <path
         style="fill:#a7b5ca;fill-opacity:1;stroke:#272398;stroke-width:0.2;stroke-dasharray:none;stroke-opacity:1"
         d="m -38.221828,61.629339 c -3.39e-4,-1.382749 -4.165307,-2.091106 -4.778918,-2.173769 -0.61355,-0.08275 -9.013541,0.904172 -10.291601,1.598692 -1.278051,0.694524 -3.22419,1.030314 -3.473135,0.908155"
         id="path66-6-5-1-2"
         sodipodi:nodetypes="cssc" />
      <path
         style="fill:none;stroke:#272398;stroke-width:0.2;stroke-dasharray:none;stroke-opacity:1"
         d="m -43.532647,59.396895 c 0.05018,-1.128302 -3.362034,-1.437695 -3.795876,-1.429336 -0.433886,0.0085 -6.430863,1.449053 -8.239013,2.550046 -0.782139,0.476233 -1.894764,1.021497 -2.640016,0.985761"
         id="path67-6-6-3-4"
         sodipodi:nodetypes="ccsc" />
      <path
         style="fill:none;stroke:#272398;stroke-width:0.2;stroke-dasharray:none;stroke-opacity:1"
         d="m -48.047379,58.028723 c 0.24262,-1.307144 -2.780696,-1.115618 -3.325104,-0.947254 -0.54447,0.168447 -5.335377,2.881591 -6.213188,3.256105 -0.877819,0.374509 -2.273436,0.765638 -3.003858,1.059308"
         id="path68-4-4-9-6"
         sodipodi:nodetypes="cssc" />
      <path
         style="fill:none;stroke:#272398;stroke-width:0.2;stroke-dasharray:none;stroke-opacity:1"
         d="m -51.654409,57.136086 c 0.03437,-0.963028 -2.18718,-0.743351 -2.726783,-0.505149 -0.539611,0.238197 -3.900618,3.15448 -4.570716,3.402159 -0.670106,0.247673 -2.034835,0.671321 -2.390955,1.079334"
         id="path69-0-9-6-6"
         sodipodi:nodetypes="cssc" />
      <path
         style="fill:none;stroke:#272398;stroke-width:0.2;stroke-dasharray:none;stroke-opacity:1"
         d="m -54.609119,56.664502 c -0.01934,-1.102096 -1.828257,-0.886565 -2.303328,-0.510015 -0.475018,0.376461 -2.729411,2.91863 -3.299364,3.215624 -0.5699,0.296906 -1.375778,0.775867 -1.913869,0.919286"
         id="path70-0-7-5-4"
         sodipodi:nodetypes="cssc" />
      <path
         style="fill:none;stroke:#272398;stroke-width:0.2;stroke-dasharray:none;stroke-opacity:1"
         d="m -57.122879,56.413641 c -0.154097,-1.06407 -2.553432,-1.006186 -2.942193,-0.698618 -0.388823,0.307652 -2.131266,1.935161 -2.598469,2.80907 -0.467203,0.873909 -0.929962,1.066345 -1.24343,1.231446"
         id="path71-9-7-4-9"
         sodipodi:nodetypes="cssc" />
      <path
         style="fill:none;stroke:#272398;stroke-width:0.2;stroke-dasharray:none;stroke-opacity:1"
         d="m -60.239016,55.919108 c -0.510427,-0.928805 -2.268083,-0.513303 -2.733393,-0.217222 -0.465363,0.296169 -2.000221,2.854062 -2.685097,3.566743"
         id="path72-5-5-1-0"
         sodipodi:nodetypes="csc" />
      <path
         style="fill:none;stroke:#272398;stroke-width:0.2;stroke-dasharray:none;stroke-opacity:1"
         d="m -63.197696,55.823201 c -0.361615,-0.88437 -2.227236,-0.39845 -2.567043,0.05271 -0.339763,0.451183 -1.550382,2.768893 -1.870053,3.53327"
         id="path73-3-7-7-9"
         sodipodi:nodetypes="csc" />
      <path
         style="fill:none;stroke:#272398;stroke-width:0.2;stroke-dasharray:none;stroke-opacity:1"
         d="m -65.851648,55.829686 c -0.510414,-0.751483 -2.218809,-0.207076 -2.558903,0.09561 -0.340094,0.302688 -0.841231,1.745207 -1.174173,2.482611 -0.332978,0.737503 0.112407,0.702351 -0.05586,1.024499"
         id="path74-4-3-2-1"
         sodipodi:nodetypes="cssc" />
      <path
         style="fill:none;stroke:#272398;stroke-width:0.2;stroke-dasharray:none;stroke-opacity:1"
         d="m -68.648435,56.082257 c -0.493007,-0.674727 -1.860075,-0.02011 -2.047823,0.462885 -0.187748,0.482993 -0.718934,1.941202 -0.901663,2.245391 -0.183083,0.303982 -1.264979,1.505808 -1.264979,1.505808"
         id="path75-5-3-2-7"
         sodipodi:nodetypes="cscc" />
      <path
         style="fill:#a7b5ca;fill-opacity:1;stroke:#272398;stroke-width:0.2;stroke-dasharray:none;stroke-opacity:1"
         d="m -46.27215,66.396825 c 0.324392,-0.597839 0.6273,-0.84287 0.392449,-1.170156 -0.234903,-0.327197 -1.931464,-1.891508 -2.199518,-2.021767 -0.268263,-0.129903 -1.929249,-1.017423 -2.227579,-1.081054 -0.298339,-0.06364 -2.411512,-1.053673 -3.062501,-1.033235 -0.65098,0.02044 -2.102927,-0.395492 -2.407554,-0.533673 -0.304687,-0.138097 -1.149081,-0.0691 -1.786861,-0.206596 -0.637727,-0.137583 -2.186071,-0.745458 -2.605274,-1.0998 l -2.34755,-0.698902 c -0.994368,-0.06844 -2.256461,-0.09586 -2.78866,-0.262733 -0.532138,-0.166953 -1.973681,-0.02877 -2.364014,-0.01094 -0.39028,0.01775 -1.705105,0.291217 -2.056314,0.382851 -0.351148,0.09155 -1.556894,0.966749 -2.461017,0.354963 -0.903914,-0.612143 -3.374289,4.589438 -2.984502,6.591757 6.000109,-2.979922 9.634106,-1.352967 16.743383,0.130899 1.254088,0.261783 11.736837,0.598198 12.155512,0.658384 z"
         id="path77-9-5-3-8"
         sodipodi:nodetypes="cscssssccsssscsc" />
      <path
         style="fill:none;stroke:#272398;stroke-width:0.2;stroke-dasharray:none;stroke-opacity:1"
         d="m -61.052234,64.71687 c 1.703792,0.127381 4.140604,0.806869 4.801381,0.579136 0.660822,-0.227827 1.908374,-0.371626 1.605677,-0.603385 -0.302758,-0.231676 -1.083266,-0.788161 -1.367154,-0.751001 -0.283522,0.03654 -1.188916,0.570614 -1.906933,0.379186"
         id="path79-0-3-6-6" />
      <path
         style="fill:none;stroke:#272398;stroke-width:0.2;stroke-dasharray:none;stroke-opacity:1"
         d="m -57.217206,63.531172 c -0.81416,-0.288508 -1.034714,-0.103393 -1.745486,-0.131596"
         id="path80-7-7-0-7" />
      <path
         style="fill:none;stroke:#272398;stroke-width:0.2;stroke-dasharray:none;stroke-opacity:1"
         d="m -61.598961,62.643524 c -2.067251,-0.516496 -2.171397,-0.469493 -2.430724,-0.449085"
         id="path81-6-7-5-0" />
      <path
         style="fill:none;stroke:#272398;stroke-width:0.2;stroke-dasharray:none;stroke-opacity:1"
         d="m -64.948498,62.199605 c -0.63745,-0.05278 -0.777386,-0.175566 -1.395105,-0.07134"
         id="path82-3-7-7-6" />
      <path
         style="fill:none;stroke:#272398;stroke-width:0.2;stroke-dasharray:none;stroke-opacity:1"
         d="m -67.396618,62.16639 c -1.094684,0.02385 -1.877546,0.0683 -2.455104,0.189392"
         id="path83-0-0-4-4" />
      <path
         style="fill:none;stroke:#272398;stroke-width:0.2;stroke-dasharray:none;stroke-opacity:1"
         d="m -70.36793,62.367342 c -0.70922,0.104585 -3.692791,0.707639 -5.056227,1.334777"
         id="path84-0-9-0-1" />
      <path
         style="fill:#ffffff;fill-opacity:1;stroke:#272398;stroke-width:0.2;stroke-dasharray:none;stroke-opacity:1"
         d="m -79.461777,68.079979 c -3.393685,-1.044046 -11.087349,-1.325615 -13.564149,-1.001809 -2.476864,0.32373 -8.120964,2.887683 -10.151754,3.11525 -2.03073,0.227644 -11.05617,2.804969 -13.04015,3.265158 -1.98405,0.46012 -24.39589,11.30907 -25.52593,11.975732 3.71729,-6.006539 13.71794,-14.326773 20.65557,-19.106417 4.04661,-2.787891 20.69353,-8.280593 26.593006,-8.239751 1.35125,0.0094 14.217658,7.343262 15.033407,9.991837 z"
         id="path76-9-59-7"
         sodipodi:nodetypes="cccccssc" />
      <path
         style="fill:#ffffff;fill-opacity:1;stroke:#272398;stroke-width:0.2;stroke-dasharray:none;stroke-opacity:1"
         d="m -106.06415,55.403353 c 0.7731,-0.0102 14.451004,3.21482 15.300304,3.10563 4.1684,-1.50859 9.4525,-3.16777 13.4897,-0.53484 3.031,-3.12038 8.6873,-1.83233 10.0542,0.99476 0.6476,1.33944 0.3562,2.33919 0.9337,3.53757 0.6254,1.29767 1.6137,2.22833 1.2312,3.75959 -0.6211,-0.43533 -1.2417,-1.18176 -1.9903,-1.37623 -0.8207,-0.2132 -2.2765,0.67771 -5.3397,0.87037 -0.6821,0.71761 -7.8919,3.8953 -15.5196,0.55269 l -0.1086,-0.13581 c -0.3678,-0.097 -3.6709,-1.54488 -4.2784,-1.79901 -0.6075,-0.25413 -3.5656,0.46361 -4.63469,0.43835 -8.081734,0.11442 -9.713844,-9.40547 -9.137814,-9.41307 z m 10.505604,9.07735 0.2336,-1.09083 c -1.8961,-1.65825 -1.439,-2.33628 -0.8154,-3.17175 0.6235,-0.83548 4.3795,-1.27319 5.2627,-1.51248 0,0 -3.6912,2.04524 -2.492,2.76677 2.4243,-1.74873 10.2575,-3.97537 11.3391,-2.75847 1.6163,1.81834 1.6678,7.46682 -1.4356,7.0722 -3.1034,-0.39462 -9.7487,-2.49151 -7.6425,-3.50514 2.1062,-1.01363 7.859,-2.78101 8.0121,-0.85115 0.1978,2.49152 -3.8857,1.35407 -3.8857,1.35407"
         id="path195-2-1-38"
         sodipodi:nodetypes="sccsscscccscscccccssssc" />
      <path
         style="fill:none;stroke:#272398;stroke-width:0.2;stroke-dasharray:none;stroke-opacity:1"
         d="m -96.0411,64.732887 c -0.7702,-0.22984 -1.4844,-0.76853 -1.4645,-1.20667 0.02,-0.43814 1.7758,-0.13288 2.1868,-0.51715"
         id="path55-3-0-7" />
      <path
         style="fill:#a7b5ca;fill-opacity:1;stroke:#272398;stroke-width:0.2;stroke-dasharray:none;stroke-opacity:1"
         d="m -97.4023,63.412127 c -0.6081,0.0241 -2.9135,-0.85706 -2.4718,-1.53509 0.5493,-0.71497 3.2418,0.2411 3.9545,-0.34712"
         id="path56-7-0-3"
         sodipodi:nodetypes="ccc" />
      <path
         style="fill:none;stroke:#272398;stroke-width:0.2;stroke-dasharray:none;stroke-opacity:1"
         d="m -99.8318,61.822437 c -0.7054,-0.23616 -2.967,-1.26209 -2.9952,-2.40229 -0.079,-0.85706 4.3492,1.41121 7.336,0.9503"
         id="path57-3-9-4"
         sodipodi:nodetypes="ccc" />
      <path
         style="fill:#a7b5ca;fill-opacity:1;stroke:#272398;stroke-width:0.2;stroke-dasharray:none;stroke-opacity:1"
         d="m -102.7423,59.314757 c -0.3866,-0.0965 -2.4281,-1.48049 -2.2856,-2.69815 0.1425,-1.21766 5.1813,2.95036 10.3774,3.09638"
         id="path58-2-8-5"
         sodipodi:nodetypes="csc" />
      <path
         style="fill:none;stroke:#272398;stroke-width:0.2;stroke-dasharray:none;stroke-opacity:1"
         d="m -100.6555,56.368307 c 1.5849,0.76091 4.7405,2.19076 7.2408,2.92252"
         id="path60-3-1-6"
         sodipodi:nodetypes="cc" />
      <path
         style="fill:#a7b5ca;fill-opacity:1;stroke:#272398;stroke-width:0.2;stroke-dasharray:none;stroke-opacity:1"
         d="m -75.9009,56.729097 c -0.8959,0.37492 -2.5752,2.01589 -2.5269,2.87523 0.038,0.6776 1.0228,0.65315 1.116,1.20605 0.093,0.55292 -2.2175,-0.66645 -2.0716,1.92499 0.1731,3.07594 2.2618,-0.29256 2.3627,1.08583 0.1009,1.37834 -0.9779,0.75156 -0.8588,1.9425 0.1622,1.62238 2.847,1.90451 3.1908,1.70971 -0.2511,-1.49116 -1.3454,-3.65768 -1.4865,-5.28099 z"
         id="path87-5-7"
         sodipodi:nodetypes="csssssccc" />
      <path
         style="fill:#ffffff;fill-opacity:1;stroke:#272398;stroke-width:0.2;stroke-dasharray:none;stroke-opacity:1"
         d="m -64.8026,65.754277 c -0.5971,-0.52617 -4.3431,-1.24614 -4.6475,-0.94759 -0.7091,0.69534 -0.578,-0.82533 -0.2546,-1.46321 1.1035,0.11703 4.9021,2.4108 4.9021,2.4108 z"
         id="path88-6-5"
         sodipodi:nodetypes="cscc" />
      <path
         style="fill:#a7b5ca;fill-opacity:1;stroke:#272398;stroke-width:0.2;stroke-dasharray:none;stroke-opacity:1"
         d="m -68.306,58.970337 c -1.1433,-0.63062 -2.8627,-0.97494 -2.91,-0.72735 -0.047,0.24762 1.8741,0.56485 2.0503,0.82405 0.1762,0.25922 -0.6748,0.47586 -1.0574,0.5726 -0.3825,0.0967 1.5646,0.20504 1.9171,-0.6693 z"
         id="path85-4-4" />
      <path
         style="fill:none;fill-opacity:1;stroke:#272398;stroke-width:0.2;stroke-dasharray:none;stroke-opacity:1"
         d="m -65.5197,62.304837 c -1.3583,-0.2206 -5.3772,1.18775 -4.7067,1.09877 0.6706,-0.089 3.9706,1.40544 4.3747,1.58727"
         id="path86-7-3"
         sodipodi:nodetypes="csc" />
      <path
         style="fill:none;stroke:#272398;stroke-width:0.2;stroke-dasharray:none;stroke-opacity:1"
         d="m -141.86387,85.549189 c 1.07537,-1.150294 5.41314,-5.183093 6.07301,-5.543785 0.65994,-0.360622 16.18998,-7.362416 19.72649,-7.678563 0.47027,-0.04206 3.6332,-0.265099 4.30966,-0.676883"
         id="path62-1-3-9"
         sodipodi:nodetypes="ccsc" />
      <path
         style="fill:#a7b5ca;fill-opacity:1;stroke:#272398;stroke-width:0.2;stroke-dasharray:none;stroke-opacity:1"
         d="m -136.07718,79.982132 c -0.0813,-1.341817 3.3244,-3.460657 3.83203,-3.647549 0.5077,-0.186821 13.79683,-4.837272 16.8856,-5.013719 1.4322,-0.08189 4.08649,-0.531664 4.5434,-0.793955"
         id="path63-1-5-8"
         sodipodi:nodetypes="cssc" />
      <path
         style="fill:none;stroke:#272398;stroke-width:0.2;stroke-dasharray:none;stroke-opacity:1"
         d="m -132.16815,76.081677 c -0.14919,-1.029476 3.08839,-2.342105 3.38266,-2.462443 0.29441,-0.120186 13.90508,-3.670404 14.44407,-3.765458 0.53899,-0.09505 4.24605,-0.167301 4.68656,-0.38614"
         id="path64-0-5-7"
         sodipodi:nodetypes="ccsc" />
      <path
         style="fill:none;stroke:#272398;stroke-width:0.2;stroke-dasharray:none;stroke-opacity:1"
         d="m -128.61681,73.531457 c -0.19939,-1.074355 3.4406,-2.88062 3.90526,-3.106331 0.46537,-0.224867 10.75817,-2.252286 12.46075,-2.095433 1.70258,0.156852 4.34547,-0.144417 4.54217,-0.15603"
         id="path65-5-4-5"
         sodipodi:nodetypes="ccsc" />
      <path
         style="fill:#a7b5ca;fill-opacity:1;stroke:#272398;stroke-width:0.2;stroke-dasharray:none;stroke-opacity:1"
         d="m -123.99077,70.12724 c -0.21285,-1.332285 3.73572,-2.785836 4.3208,-2.979079 0.585,-0.193313 8.92098,-0.797578 10.27322,-0.365049 1.35224,0.432537 3.30007,0.39576 3.52377,0.231977"
         id="path66-6-55-6"
         sodipodi:nodetypes="cssc" />
      <path
         style="fill:none;stroke:#272398;stroke-width:0.2;stroke-dasharray:none;stroke-opacity:1"
         d="m -119.16081,66.993157 c -0.22284,-1.077783 3.05386,-2.007587 3.47783,-2.079853 0.42402,-0.07218 6.48877,0.205534 8.42013,0.931547 0.83544,0.31403 2.00349,0.633386 2.72406,0.460984"
         id="path67-6-3-5"
         sodipodi:nodetypes="ccsc" />
      <path
         style="fill:none;stroke:#272398;stroke-width:0.2;stroke-dasharray:none;stroke-opacity:1"
         d="m -114.9732,64.839148 c -0.4379,-1.214462 2.53714,-1.589653 3.0935,-1.528231 0.55642,0.06149 5.64234,1.788539 6.5553,1.986856 0.91297,0.19831 2.33297,0.316771 3.08987,0.464485"
         id="path68-4-8-9"
         sodipodi:nodetypes="cssc" />
      <path
         style="fill:none;stroke:#272398;stroke-width:0.2;stroke-dasharray:none;stroke-opacity:1"
         d="m -111.59661,63.311345 c -0.18196,-0.921476 2.01629,-1.12111 2.57873,-0.991511 0.56245,0.129593 4.28657,2.317079 4.97761,2.431649 0.69105,0.114564 2.08597,0.270075 2.49583,0.597249"
         id="path69-0-5-3"
         sodipodi:nodetypes="cssc" />
      <path
         style="fill:none;stroke:#272398;stroke-width:0.2;stroke-dasharray:none;stroke-opacity:1"
         d="m -108.79065,62.309976 c -0.15107,-1.065406 1.64453,-1.192643 2.16543,-0.917803 0.52083,0.274763 3.10914,2.306676 3.71022,2.487301 0.60101,0.180548 1.45999,0.492813 2.00634,0.531372"
         id="path70-0-1-2"
         sodipodi:nodetypes="cssc" />
      <path
         style="fill:none;stroke:#272398;stroke-width:0.2;stroke-dasharray:none;stroke-opacity:1"
         d="m -106.38025,61.602899 c -0.0139,-1.053717 2.33259,-1.442146 2.75877,-1.21779 0.42624,0.224426 2.37477,1.469881 2.96468,2.225362 0.58991,0.755481 1.070432,0.855213 1.401287,0.956248"
         id="path71-9-5-3"
         sodipodi:nodetypes="cssc" />
      <path
         style="fill:none;stroke:#272398;stroke-width:0.2;stroke-dasharray:none;stroke-opacity:1"
         d="m -103.42055,60.549534 c 0.35409,-0.989364 2.13057,-0.914446 2.62956,-0.715329 0.49905,0.199193 2.388766,2.379466 3.165893,2.939311"
         id="path72-5-8-0"
         sodipodi:nodetypes="csc" />
      <path
         style="fill:none;stroke:#272398;stroke-width:0.2;stroke-dasharray:none;stroke-opacity:1"
         d="m -100.5528,59.909379 c 0.21596,-0.919002 2.108489,-0.796227 2.509108,-0.424464 0.40058,0.371795 1.937375,2.380689 2.366667,3.057954"
         id="path73-3-77-3"
         sodipodi:nodetypes="csc" />
      <path
         style="fill:none;stroke:#272398;stroke-width:0.2;stroke-dasharray:none;stroke-opacity:1"
         d="m -97.966145,59.424291 c 0.381419,-0.818519 2.129782,-0.610286 2.507791,-0.381621 0.378008,0.228664 1.088648,1.525696 1.52671,2.174516 0.438113,0.648909 -0.0012,0.697498 0.212378,0.976722"
         id="path74-4-0-2"
         sodipodi:nodetypes="cssc" />
      <path
         style="fill:none;stroke:#272398;stroke-width:0.2;stroke-dasharray:none;stroke-opacity:1"
         d="m -95.202392,59.149853 c 0.376293,-0.741344 1.809105,-0.363737 2.066487,0.06685 0.257382,0.430586 0.999715,1.737172 1.22464,1.996417 0.225238,0.258979 1.464582,1.216595 1.464582,1.216595"
         id="path75-5-4-6"
         sodipodi:nodetypes="cscc" />
      <path
         style="fill:#a7b5ca;fill-opacity:1;stroke:#272398;stroke-width:0.2;stroke-dasharray:none;stroke-opacity:1"
         d="m -115.4126,73.230134 c -0.40821,-0.515938 -0.7411,-0.695936 -0.56275,-1.054743 0.17841,-0.35873 1.59013,-2.179971 1.83121,-2.355097 0.24133,-0.17482 1.72274,-1.337415 2.00358,-1.453952 0.28085,-0.116544 2.187,-1.461624 2.82439,-1.562453 0.63738,-0.100822 1.98784,-0.770364 2.26332,-0.959892 0.27555,-0.189459 1.10885,-0.279313 1.70902,-0.529856 0.60011,-0.25062 2.01489,-1.122935 2.36867,-1.541937 l 2.17939,-1.107976 c 0.958224,-0.250029 2.183609,-0.510108 2.676385,-0.769408 0.492704,-0.259369 1.918454,-0.393117 2.301491,-0.448197 0.382972,-0.05516 1.706123,-0.0351 2.062421,-0.01183 0.356226,0.0232 1.665876,0.643191 2.452411,-0.113624 0.786275,-0.75712 3.995024,3.797044 3.923973,5.79836 -6.305125,-1.760211 -9.594769,0.480071 -16.292321,3.225884 -1.18145,0.484392 -11.34257,2.749226 -11.74119,2.884724 z"
         id="path77-9-1-4"
         sodipodi:nodetypes="cscssssccsssscsc" />
      <path
         style="fill:none;stroke:#272398;stroke-width:0.2;stroke-dasharray:none;stroke-opacity:1"
         d="m -101.27188,68.87527 c -1.6403,0.438157 -3.90965,1.543953 -4.58853,1.446874 -0.67894,-0.09716 -1.91656,-0.0047 -1.65738,-0.284073 0.25925,-0.279261 0.93387,-0.959911 1.21619,-0.976666 0.28185,-0.01729 1.24629,0.329655 1.91631,0.01229"
         id="path79-0-4-4" />
      <path
         style="fill:none;stroke:#272398;stroke-width:0.2;stroke-dasharray:none;stroke-opacity:1"
         d="m -105.19102,68.442892 c 0.74873,-0.428695 0.99215,-0.291176 1.68028,-0.449936"
         id="path80-7-3-1" />
      <path
         style="fill:none;stroke:#272398;stroke-width:0.2;stroke-dasharray:none;stroke-opacity:1"
         d="m -101.05888,66.776467 c 1.934425,-0.880341 2.043138,-0.854337 2.298938,-0.882685"
         id="path81-6-5-5" />
      <path
         style="fill:none;stroke:#272398;stroke-width:0.2;stroke-dasharray:none;stroke-opacity:1"
         d="m -97.863978,65.728656 c 0.612909,-0.168864 0.730313,-0.313072 1.348204,-0.327013"
         id="path82-3-1-5" />
      <path
         style="fill:none;stroke:#272398;stroke-width:0.2;stroke-dasharray:none;stroke-opacity:1"
         d="m -95.483981,65.243424 c 1.070191,-0.179682 1.839759,-0.28179 2.421123,-0.272051"
         id="path83-0-9-3" />
      <path
         style="fill:none;stroke:#272398;stroke-width:0.2;stroke-dasharray:none;stroke-opacity:1"
         d="m -92.558152,64.886944 c 0.707093,-0.03054 3.706858,-0.0019 5.131895,0.349924"
         id="path84-0-6-0" />
      <rect
         style="fill:none;stroke:none;stroke-width:0.2"
         id="rect1-9"
         width="156.64949"
         height="128.91223"
         x="-158.01286"
         y="-7.5700917" />
    </g>
    <g
       id="frame4"
       inkscape:label="frame4"
       transform="translate(157.91286,58.270133)"
       style="display:inline;stroke:#272398;stroke-opacity:1">
      <path
         style="fill:#ffffff;fill-opacity:1;stroke:#272398;stroke-width:0.2;stroke-dasharray:none;stroke-opacity:1"
         d="m -70.79106,4.4358819 c 1.002526,-3.0183126 5.240279,-1.82877 7.183687,-2.5279694 1.943382,-0.6990996 11.238964,-2.35163082 13.237596,-2.81370895 1.998669,-0.46217535 26.952135,-0.43216595 28.260641,-0.31949655 -5.829678,-4.3699923 -21.122923,-7.4535178 -32.150396,-7.9538249 -11.027473,-0.5003071 -19.275387,-1.3886071 -23.359637,4.6559192 -3.772938,5.5837974 -1.508903,10.1592974 -1.508903,10.1592974 z"
         id="path76-9-5-0-8-8"
         sodipodi:nodetypes="csscsscc" />
      <path
         style="fill:none;stroke:#272398;stroke-width:0.2;stroke-dasharray:none;stroke-opacity:1"
         d="m -21.951552,-1.172414 c -1.462125,-0.5865327 -7.104663,-2.3882975 -7.856717,-2.4275236 -0.75209,-0.039129 -17.826397,0.4193696 -21.177036,1.7114563 -0.445557,0.1718001 -3.417142,1.3828698 -4.205774,1.30361274"
         id="path62-1-6-3-7-7"
         sodipodi:nodetypes="ccsc" />
      <path
         style="fill:#a7b5ca;fill-opacity:1;stroke:#272398;stroke-width:0.2;stroke-dasharray:none;stroke-opacity:1"
         d="m -29.557549,-3.7499485 c -0.490266,-1.2831424 -4.479938,-1.724594 -5.020391,-1.6706088 -0.540489,0.054082 -14.587151,1.6923651 -17.471665,2.913472 -1.337519,0.5661354 -3.941661,1.3384653 -4.467675,1.2996545"
         id="path63-1-0-3-7-8"
         sodipodi:nodetypes="cssc" />
      <path
         style="fill:none;stroke:#272398;stroke-width:0.2;stroke-dasharray:none;stroke-opacity:1"
         d="m -34.754349,-5.6210038 c -0.297159,-1.0233871 -3.794834,-0.7911809 -4.113185,-0.7710301 -0.318405,0.020351 -14.194959,2.8250395 -14.725332,2.9784157 -0.530373,0.1533762 -3.933622,1.7485458 -4.426443,1.7427529"
         id="path64-0-7-5-0-2"
         sodipodi:nodetypes="ccsc" />
      <path
         style="fill:none;stroke:#272398;stroke-width:0.2;stroke-dasharray:none;stroke-opacity:1"
         d="m -39.057911,-6.3979526 c -0.270362,-1.0875919 -4.34175,-1.1335764 -4.859439,-1.1349236 -0.517975,-2.464e-4 -10.735421,2.7315027 -12.218555,3.6406932 -1.483135,0.9091906 -4.014448,1.8143847 -4.198308,1.8918026"
         id="path65-5-8-7-9-8"
         sodipodi:nodetypes="ccsc" />
      <path
         style="fill:#a7b5ca;fill-opacity:1;stroke:#272398;stroke-width:0.2;stroke-dasharray:none;stroke-opacity:1"
         d="m -44.698411,-7.4864367 c -0.366569,-1.3332742 -4.570406,-0.9131774 -5.183997,-0.8303643 -0.613554,0.082716 -8.452143,3.2592536 -9.500603,4.2674824 -1.04845,1.0082314 -2.836145,1.8474932 -3.108554,1.7956339"
         id="path66-6-5-1-2-1"
         sodipodi:nodetypes="cssc" />
      <path
         style="fill:none;stroke:#272398;stroke-width:0.2;stroke-dasharray:none;stroke-opacity:1"
         d="m -50.410853,-8.2324985 c -0.250459,-1.1012961 -3.622756,-0.4958621 -4.03889,-0.3728923 -0.416151,0.1230723 -5.817383,3.1006125 -7.269341,4.6412009 -0.628068,0.6663853 -1.556534,1.4868711 -2.284636,1.6498027"
         id="path67-6-6-3-4-9"
         sodipodi:nodetypes="ccsc" />
      <path
         style="fill:none;stroke:#272398;stroke-width:0.2;stroke-dasharray:none;stroke-opacity:1"
         d="m -55.126724,-8.3560117 c -0.112262,-1.3247206 -2.976873,-0.339264 -3.457245,-0.032719 -0.480408,0.3066427 -4.381593,4.1918331 -5.128857,4.7854726 -0.747274,0.5936369 -1.989451,1.3404477 -2.616003,1.8170932"
         id="path68-4-4-9-6-6"
         sodipodi:nodetypes="cssc" />
      <path
         style="fill:none;stroke:#272398;stroke-width:0.2;stroke-dasharray:none;stroke-opacity:1"
         d="m -58.841359,-8.2613911 c 0.07702,-1.9266899 -2.08928,-0.8542591 -2.763194,0.2351217 -0.31032,0.5016414 -2.925797,4.0749583 -3.506361,4.4912764 -0.580574,0.4163155 -1.784352,1.1863024 -2.019685,1.6740673"
         id="path69-0-9-6-6-4"
         sodipodi:nodetypes="cssc" />
      <path
         style="fill:none;stroke:#272398;stroke-width:0.2;stroke-dasharray:none;stroke-opacity:1"
         d="m -61.815449,-7.9335331 c 0.214995,-2.5565939 -1.617537,-1.455199 -2.356151,0.1182717 -0.257564,0.5487009 -1.858888,3.5373183 -2.329822,3.9746664 -0.470906,0.4372484 -1.121143,1.1125531 -1.60203,1.3933714"
         id="path70-0-7-5-4-0"
         sodipodi:nodetypes="cssc" />
      <path
         style="fill:none;stroke:#272398;stroke-width:0.2;stroke-dasharray:none;stroke-opacity:1"
         d="m -64.305877,-7.5096269 c 0.04341,-3.0890381 -2.364927,-1.909226 -3.022153,0.1056176 -0.153717,0.4713883 -1.542592,2.4305461 -1.76164,3.3969896 -0.219049,0.9664434 -0.614312,1.2745754 -0.872854,1.5168066"
         id="path71-9-7-4-9-1"
         sodipodi:nodetypes="cssc" />
      <path
         style="fill:none;stroke:#272398;stroke-width:0.2;stroke-dasharray:none;stroke-opacity:1"
         d="m -67.441706,-7.1611413 c -0.63775,-2.6272939 -2.186481,-2.431778 -2.693306,0.5145164 -0.09353,0.5436798 -1.172842,3.2819193 -1.644493,4.1505469"
         id="path72-5-5-1-0-7"
         sodipodi:nodetypes="csc" />
      <path
         style="fill:none;stroke:#272398;stroke-width:0.2;stroke-dasharray:none;stroke-opacity:1"
         d="m -70.32012,-6.4699723 c -0.463114,-2.7136166 -2.080827,-2.6091382 -2.461402,0.7307464 -0.06396,0.5611632 -0.761628,3.0806462 -0.867425,3.9023933"
         id="path73-3-7-7-9-9"
         sodipodi:nodetypes="csc" />
      <path
         style="fill:none;stroke:#272398;stroke-width:0.2;stroke-dasharray:none;stroke-opacity:1"
         d="m -72.877571,-5.7607783 c -0.637073,-2.1123428 -2.280059,-1.2330868 -2.568291,0.3916133 -0.07948,0.4483173 -0.222839,2.2840381 -0.348578,3.0832909 -0.125746,0.7993579 0.294421,0.6474947 0.217485,1.0027063"
         id="path74-4-3-2-1-2"
         sodipodi:nodetypes="cssc" />
      <path
         style="fill:none;stroke:#272398;stroke-width:0.2;stroke-dasharray:none;stroke-opacity:1"
         d="m -75.507574,-4.7764565 c -0.659377,-1.574558 -3.1704,1.60823 -3.523018,3.7126084 -0.0856,0.51112327 1.491834,-0.6615646 1.3962,-0.3198405 -0.09603,0.3416175 -0.820965,1.78707763 -0.820965,1.78707763"
         id="path75-5-3-2-7-8"
         sodipodi:nodetypes="cscc" />
      <path
         style="fill:#a7b5ca;fill-opacity:1;stroke:#272398;stroke-width:0.2;stroke-dasharray:none;stroke-opacity:1"
         d="m -51.198478,-0.756969 c 0.15446,-0.662407 0.38165,-0.9789165 0.0685,-1.2323101 -0.313177,-0.2532937 -2.363477,-1.312376 -2.656458,-1.366985 -0.293089,-0.05421 -2.129827,-0.470095 -2.434356,-0.4524362 -0.304539,0.017656 -2.604467,-0.3773159 -3.226793,-0.1851834 -0.622316,0.1921351 -2.132575,0.1756252 -2.462921,0.1230643 -0.330382,-0.052464 -1.126345,0.2377163 -1.777764,0.2740594 -0.651392,0.036243 -2.305442,-0.1398201 -2.803527,-0.3704738 l -2.448823,-0.052157 c -0.976982,0.197379 -2.201263,0.5052184 -2.758653,0.4852696 -0.557353,-0.020046 -1.910813,0.4950143 -2.282481,0.6155978 -0.371641,0.1204837 -1.641378,0.641609 -1.88147,0.9138229 -1.006411,1.14105991 0.720009,9.3766615 -0.367993,9.287222 -1.391074,-0.1144287 3.854717,-4.0376171 4.119881,-1.7466196 4.99654,-4.4627158 1.768696,-3.2560381 9.017093,-3.7081679 1.278636,-0.079731 11.476103,-2.53184669 11.895766,-2.5847031 z"
         id="path77-9-5-3-8-0"
         sodipodi:nodetypes="cscssssccsssscscc" />
      <path
         style="fill:none;stroke:#272398;stroke-width:0.2;stroke-dasharray:none;stroke-opacity:1"
         d="m -65.89566,1.5378058 c 1.676681,-0.3284432 4.206436,-0.3186496 4.783296,-0.71326617 0.576877,-0.39471904 1.741786,-0.86381553 1.388515,-1.00712431 -0.353308,-0.14321153 -1.253334,-0.47309262 -1.517241,-0.36206707 -0.263719,0.11032666 -0.995319,0.86513695 -1.738394,0.87072357"
         id="path79-0-3-6-6-7" />
      <path
         style="fill:none;stroke:#272398;stroke-width:0.2;stroke-dasharray:none;stroke-opacity:1"
         d="m -62.511647,-0.62131106 c -0.8615,-0.0625618 -1.025146,0.17435978 -1.718002,0.33542268"
         id="path80-7-7-0-7-1" />
      <path
         style="fill:none;stroke:#272398;stroke-width:0.2;stroke-dasharray:none;stroke-opacity:1"
         d="m -66.972017,-0.31668224 c -2.130222,0.049493 -2.218199,0.12240175 -2.462859,0.21076725"
         id="path81-6-7-5-0-3" />
      <path
         style="fill:none;stroke:#272398;stroke-width:0.2;stroke-dasharray:none;stroke-opacity:1"
         d="m -70.319506,0.14242857 c -0.628663,0.11794472 -0.796124,0.0366064 -1.364175,0.30072455"
         id="path82-3-7-7-6-7" />
      <path
         style="fill:none;stroke:#272398;stroke-width:0.2;stroke-dasharray:none;stroke-opacity:1"
         d="M -72.68899,0.75882123 C -73.73826,1.0717652 -74.481389,1.3219813 -75.006248,1.5917216"
         id="path83-0-0-4-4-8" />
      <path
         style="fill:none;stroke:#272398;stroke-width:0.2;stroke-dasharray:none;stroke-opacity:1"
         d="m -75.500957,1.7395943 c -0.656191,0.288697 -3.373476,1.6604579 -4.522111,2.6263244"
         id="path84-0-9-0-1-2" />
      <path
         style="fill:#ffffff;fill-opacity:1;stroke:#272398;stroke-width:0.2;stroke-dasharray:none;stroke-opacity:1"
         d="m -80.844937,11.906853 c -3.019395,-1.868257 -10.391831,-4.0861252 -12.870018,-4.3991353 -2.47823,-0.3131003 -8.587245,0.7403385 -10.609575,0.4469972 -2.0223,-0.2932512 -11.40614,-0.081893 -13.44201,-0.1383353 -2.03592,-0.056528 -26.46272,4.7727054 -27.72462,5.1319544 2.71928,-2.18664 19.78727,-12.46545664 34.54239,-14.9904178 14.71014,-2.517262 28.97548,4.7784433 29.928471,6.0138955 0.952992,1.2354523 0.329009,1.8276525 -0.589947,2.6240598 -0.918956,0.7964072 0.765309,5.3109815 0.765309,5.3109815 z"
         id="path76-9-59-7-8"
         sodipodi:nodetypes="cccccsssc" />
      <path
         style="fill:#ffffff;fill-opacity:1;stroke:#272398;stroke-width:0.2;stroke-dasharray:none;stroke-opacity:1"
         d="m -105.07835,4.6668369 c 0.7731,-0.0102 14.451002,3.21482 15.300302,3.10563 4.1684,-1.50859 9.4525,-3.16777 13.4897,-0.53484 3.031,-3.12038 8.6873,-1.83233 10.0542,0.99476 0.6476,1.33944 0.3562,2.3391901 0.9337,3.5375701 0.6254,1.29767 1.6137,2.22833 1.2312,3.75959 -0.6211,-0.43533 -1.2417,-1.18176 -1.9903,-1.37623 -0.8207,-0.2132 -2.2765,0.67771 -5.3397,0.87037 -0.6821,0.71761 -7.8919,3.8953 -15.5196,0.55269 l -0.1086,-0.13581 c -0.3678,-0.097 -3.6709,-1.54488 -4.2784,-1.79901 -0.6075,-0.25413 -3.5656,0.46361 -4.63469,0.43835 -8.081732,0.11442 -9.713842,-9.4054701 -9.137812,-9.4130701 z m 10.505602,9.0773501 0.2336,-1.09083 c -1.8961,-1.65825 -1.439,-2.33628 -0.8154,-3.1717501 0.6235,-0.83548 4.3795,-1.27319 5.2627,-1.51248 0,0 -3.6912,2.0452401 -2.492,2.7667701 2.4243,-1.7487301 10.2575,-3.9753701 11.3391,-2.7584701 1.6163,1.81834 1.6678,7.4668201 -1.4356,7.0722001 -3.1034,-0.39462 -9.7487,-2.49151 -7.6425,-3.50514 2.1062,-1.01363 7.859,-2.7810101 8.0121,-0.85115 0.1978,2.49152 -3.8857,1.35407 -3.8857,1.35407"
         id="path195-2-1-3"
         sodipodi:nodetypes="sccsscscccscscccccssssc" />
      <path
         style="fill:none;stroke:#272398;stroke-width:0.2;stroke-dasharray:none;stroke-opacity:1"
         d="m -96.0132,13.7273 c -0.7702,-0.22984 -1.4844,-0.76853 -1.4645,-1.20667 0.02,-0.43814 1.7758,-0.13288 2.1868,-0.51715"
         id="path55-3-0-7-0" />
      <path
         style="fill:#a7b5ca;fill-opacity:1;stroke:#272398;stroke-width:0.2;stroke-dasharray:none;stroke-opacity:1"
         d="m -97.3744,12.40654 c -0.6081,0.0241 -2.9135,-0.85706 -2.4718,-1.53509 0.5493,-0.71497 3.2418,0.2411 3.9545,-0.34712"
         id="path56-7-0-3-2"
         sodipodi:nodetypes="ccc" />
      <path
         style="fill:none;stroke:#272398;stroke-width:0.2;stroke-dasharray:none;stroke-opacity:1"
         d="m -99.8039,10.81685 c -0.7054,-0.23616 -2.967,-1.26209 -2.9952,-2.40229 -0.079,-0.85706 4.3492,1.41121 7.336,0.9503"
         id="path57-3-9-4-6"
         sodipodi:nodetypes="ccc" />
      <path
         style="fill:#a7b5ca;fill-opacity:1;stroke:#272398;stroke-width:0.2;stroke-dasharray:none;stroke-opacity:1"
         d="m -102.7144,8.30917 c -0.3866,-0.0965 -2.4281,-1.48049 -2.2856,-2.69815 0.1425,-1.21766 5.1813,2.95036 10.3774,3.09638"
         id="path58-2-8-5-9"
         sodipodi:nodetypes="csc" />
      <path
         style="fill:none;stroke:#272398;stroke-width:0.2;stroke-dasharray:none;stroke-opacity:1"
         d="m -100.6276,5.36272 c 1.5849,0.76091 4.7405,2.19076 7.2408,2.92252"
         id="path60-3-1-6-0"
         sodipodi:nodetypes="cc" />
      <path
         style="fill:#a7b5ca;fill-opacity:1;stroke:#272398;stroke-width:0.2;stroke-dasharray:none;stroke-opacity:1"
         d="m -75.873,5.72351 c -0.8959,0.37492 -2.5752,2.01589 -2.5269,2.87523 0.038,0.6776 1.0228,0.65315 1.116,1.20605 0.093,0.55292 -2.2175,-0.66645 -2.0716,1.92499 0.1731,3.07594 2.2618,-0.29256 2.3627,1.08583 0.1009,1.37834 -0.9779,0.75156 -0.8588,1.9425 0.1622,1.62238 2.847,1.90451 3.1908,1.70971 -0.2511,-1.49116 -1.3454,-3.65768 -1.4865,-5.28099 z"
         id="path87-5-7-8"
         sodipodi:nodetypes="csssssccc" />
      <path
         style="fill:#ffffff;fill-opacity:1;stroke:#272398;stroke-width:0.2;stroke-dasharray:none;stroke-opacity:1"
         d="m -64.7747,14.74869 c -0.5971,-0.52617 -4.3431,-1.24614 -4.6475,-0.94759 -0.7091,0.69534 -0.578,-0.82533 -0.2546,-1.46321 1.1035,0.11703 4.9021,2.4108 4.9021,2.4108 z"
         id="path88-6-5-8"
         sodipodi:nodetypes="cscc" />
      <path
         style="fill:#a7b5ca;fill-opacity:1;stroke:#272398;stroke-width:0.2;stroke-dasharray:none;stroke-opacity:1"
         d="m -68.2781,7.96475 c -1.1433,-0.63062 -2.8627,-0.97494 -2.91,-0.72735 -0.047,0.24762 1.8741,0.56485 2.0503,0.82405 0.1762,0.25922 -0.6748,0.47586 -1.0574,0.5726 -0.3825,0.0967 1.5646,0.20504 1.9171,-0.6693 z"
         id="path85-4-4-3" />
      <path
         style="fill:none;fill-opacity:1;stroke:#272398;stroke-width:0.2;stroke-dasharray:none;stroke-opacity:1"
         d="m -65.4918,11.29925 c -1.3583,-0.2206 -5.3772,1.18775 -4.7067,1.09877 0.6706,-0.089 3.9706,1.40544 4.3747,1.58727"
         id="path86-7-3-2"
         sodipodi:nodetypes="csc" />
      <path
         style="fill:none;stroke:#272398;stroke-width:0.2;stroke-dasharray:none;stroke-opacity:1"
         d="m -145.63641,13.02911 c 1.33129,-0.840991 6.54784,-3.6458651 7.27747,-3.8279786 0.72968,-0.1820278 17.52553,-3.0292891 21.02705,-2.4409051 0.46562,0.078225 3.58216,0.6622208 4.34076,0.4348705"
         id="path62-1-3-9-4"
         sodipodi:nodetypes="ccsc" />
      <path
         style="fill:#a7b5ca;fill-opacity:1;stroke:#272398;stroke-width:0.2;stroke-dasharray:none;stroke-opacity:1"
         d="m -138.63007,9.106216 c 0.26063,-1.3187696 4.09144,-2.5075701 4.62983,-2.5600275 0.53844,-0.052372 14.57163,-1.1913483 17.60464,-0.5810232 1.40636,0.2829257 4.08813,0.5189393 4.59651,0.3807082"
         id="path63-1-5-8-2"
         sodipodi:nodetypes="cssc" />
      <path
         style="fill:none;stroke:#272398;stroke-width:0.2;stroke-dasharray:none;stroke-opacity:1"
         d="m -133.86179,6.3209725 c 0.11598,-1.0337453 3.58025,-1.4850498 3.8954,-1.5270657 0.31522,-0.041836 14.38129,-0.035032 14.9268,0.00929 0.54552,0.044327 4.15037,0.9118092 4.6319,0.8114715"
         id="path64-0-5-7-4"
         sodipodi:nodetypes="ccsc" />
      <path
         style="fill:none;stroke:#272398;stroke-width:0.2;stroke-dasharray:none;stroke-opacity:1"
         d="m -129.78101,4.7516337 c 0.0788,-1.089858 4.0572,-1.9170007 4.56383,-2.0178803 0.50711,-0.099884 10.97807,0.5412625 12.58566,1.1235383 1.60759,0.5822758 4.24076,0.9590873 4.43402,0.9975928"
         id="path65-5-4-5-0"
         sodipodi:nodetypes="ccsc" />
      <path
         style="fill:#a7b5ca;fill-opacity:1;stroke:#272398;stroke-width:0.2;stroke-dasharray:none;stroke-opacity:1"
         d="m -124.4445,2.6278068 c 0.13095,-1.3428113 4.31876,-1.75067213 4.93368,-1.78969068 0.61487,-0.0391043 8.83275,1.48413548 10.03168,2.24454298 1.19892,0.7604118 3.09274,1.2173656 3.35059,1.1154717"
         id="path66-6-55-6-4"
         sodipodi:nodetypes="cssc" />
      <path
         style="fill:none;stroke:#272398;stroke-width:0.2;stroke-dasharray:none;stroke-opacity:1"
         d="m -118.979,0.81689924 c 0.0569,-1.09910645 3.46226,-1.1701341 3.89072,-1.13284557 0.42849,0.037383 6.22593,1.83963073 7.91094,3.03042203 0.72888,0.5150758 1.77822,1.1194124 2.51896,1.1348179"
         id="path67-6-3-5-8"
         sodipodi:nodetypes="ccsc" />
      <path
         style="fill:none;stroke:#272398;stroke-width:0.2;stroke-dasharray:none;stroke-opacity:1"
         d="m -114.38281,-0.20821286 c -0.11658,-1.28572484 2.85665,-0.89644254 3.37939,-0.69633343 0.5228,0.2001949 5.00672,3.15715889 5.83986,3.57988509 0.83316,0.4227219 2.17706,0.8964012 2.87201,1.2307076"
         id="path68-4-8-9-5"
         sodipodi:nodetypes="cssc" />
      <path
         style="fill:none;stroke:#272398;stroke-width:0.2;stroke-dasharray:none;stroke-opacity:1"
         d="m -110.72963,-0.83254889 c 0.057,-0.93754051 2.23425,-0.57482991 2.74564,-0.30722121 0.5114,0.2676043 3.56136,3.3256986 4.20097,3.6112843 0.63962,0.2855813 1.94989,0.7887637 2.2637,1.2089444"
         id="path69-0-5-3-7"
         sodipodi:nodetypes="cssc" />
      <path
         style="fill:none;stroke:#272398;stroke-width:0.2;stroke-dasharray:none;stroke-opacity:1"
         d="m -107.76165,-1.0918483 c 0.12324,-1.0689827 1.89266,-0.7380432 2.32713,-0.340419 0.43443,0.3975342 2.42483,3.0179045 2.9607,3.3446493 0.53582,0.3266546 1.28793,0.8459772 1.80678,1.0214368"
         id="path70-0-1-2-9"
         sodipodi:nodetypes="cssc" />
      <path
         style="fill:none;stroke:#272398;stroke-width:0.2;stroke-dasharray:none;stroke-opacity:1"
         d="m -105.25079,-1.1664448 c 0.25298,-1.022993 2.62145,-0.8054504 2.97705,-0.4806211 0.35564,0.3249151 1.92591,2.02260587 2.305619,2.9027031 0.379708,0.8800973 0.819393,1.0980938 1.113948,1.2795065"
         id="path71-9-5-3-1"
         sodipodi:nodetypes="cssc" />
      <path
         style="fill:none;stroke:#272398;stroke-width:0.2;stroke-dasharray:none;stroke-opacity:1"
         d="m -102.12092,-1.4371758 c 0.59276,-0.8676744 2.292569,-0.3459821 2.724986,-0.027161 0.432462,0.3189111 1.709457,2.9061704 2.319764,3.6443297"
         id="path72-5-8-0-1"
         sodipodi:nodetypes="csc" />
      <path
         style="fill:none;stroke:#272398;stroke-width:0.2;stroke-dasharray:none;stroke-opacity:1"
         d="m -99.184491,-1.331376 c 0.441327,-0.8345266 2.241304,-0.2371905 2.534898,0.2237927 0.293549,0.46100501 1.272424,2.7932138 1.516508,3.5570207"
         id="path73-3-77-3-5"
         sodipodi:nodetypes="csc" />
      <path
         style="fill:none;stroke:#272398;stroke-width:0.2;stroke-dasharray:none;stroke-opacity:1"
         d="m -96.559237,-1.1466278 c 0.575998,-0.6954714 2.214888,-0.051908 2.522791,0.26491013 0.307903,0.31681805 0.667476,1.75139358 0.927239,2.48989867 0.259788,0.7386038 -0.177562,0.6745195 -0.0415,0.9986827"
         id="path74-4-0-2-9"
         sodipodi:nodetypes="cssc" />
      <path
         style="fill:none;stroke:#272398;stroke-width:0.2;stroke-dasharray:none;stroke-opacity:1"
         d="m -93.815905,-0.7132942 c 0.551524,-0.6221008 1.842289,0.10554169 1.982427,0.58721715 0.140137,0.48167546 0.527958,1.93350855 0.680019,2.24120385 0.152432,0.3075175 1.109353,1.5473977 1.109353,1.5473977"
         id="path75-5-4-6-3"
         sodipodi:nodetypes="cscc" />
      <path
         style="fill:none;stroke:#272398;stroke-width:0.2;stroke-dasharray:none;stroke-opacity:1"
         d="m -91.715555,-0.04721297 c 0.551524,-0.62210083 1.830229,0.10923717 1.982427,0.58721715 0.07511,0.23585982 0.527958,1.93350852 0.68002,2.24120382 0.152431,0.3075175 1.109352,1.5473978 1.109352,1.5473978"
         id="path75-5-4-6-3-6"
         sodipodi:nodetypes="cscc" />
      <path
         style="fill:none;stroke:#272398;stroke-width:0.2;stroke-dasharray:none;stroke-opacity:1"
         d="m -89.527277,0.77775527 c 0.607044,-0.56802817 1.812123,0.27908953 1.91918,0.76913873 0.05279,0.2418289 0.388485,2.1381305 0.51128,2.4586896"
         id="path75-5-4-6-3-6-2"
         sodipodi:nodetypes="csc" />
      <path
         style="fill:none;stroke:#272398;stroke-width:0.2;stroke-dasharray:none;stroke-opacity:1"
         d="m -87.556491,1.4343864 c 0.607045,-0.56802819 1.812124,0.2790895 1.91918,0.7691387 0.05279,0.2418289 0.167421,2.3020034 0.290216,2.6225624"
         id="path75-5-4-6-3-6-2-5"
         sodipodi:nodetypes="csc" />
      <path
         style="fill:none;stroke:#272398;stroke-width:0.2;stroke-dasharray:none;stroke-opacity:1"
         d="m -85.600354,2.031037 c 0.738855,-0.3810963 1.667646,0.7621208 1.63717,1.2627576 -0.01506,0.2470695 -0.208516,2.1630852 -0.177635,2.5050162"
         id="path75-5-4-6-3-6-2-7"
         sodipodi:nodetypes="csc" />
      <path
         style="fill:none;stroke:#272398;stroke-width:0.2;stroke-dasharray:none;stroke-opacity:1"
         d="m -84.000839,2.939032 c 0.738854,-0.3810963 1.667645,0.7621208 1.637169,1.2627576 -0.01506,0.2470695 -0.345114,0.9950864 -0.314233,1.3370174"
         id="path75-5-4-6-3-6-2-7-4"
         sodipodi:nodetypes="csc" />
      <path
         style="fill:none;stroke:#272398;stroke-width:0.2;stroke-dasharray:none;stroke-opacity:1"
         d="m -82.321336,3.8298401 c 0.738854,-0.3810963 1.872586,0.4689505 1.482154,1.6363315"
         id="path75-5-4-6-3-6-2-7-4-3"
         sodipodi:nodetypes="cc" />
      <path
         style="fill:#a7b5ca;fill-opacity:1;stroke:#272398;stroke-width:0.2;stroke-dasharray:none;stroke-opacity:1"
         d="m -116.92971,7.7989726 c -0.26449,-0.6023933 -0.54104,-0.8607184 -0.27776,-1.1627662 0.26332,-0.3019577 2.08969,-1.7070381 2.36722,-1.8155136 0.27769,-0.1081151 2.00493,-0.858333 2.30612,-0.9000679 0.30119,-0.041739 2.48552,-0.8611097 3.12769,-0.7974897 0.64216,0.063624 2.11803,-0.2426767 2.43249,-0.356386 0.3145,-0.1136236 1.14344,0.010155 1.78746,-0.080486 0.64398,-0.09073 2.23336,-0.5769501 2.68159,-0.8928762 l 2.38873,-0.5208806 c 0.99031,3.973e-4 2.241636,0.058626 2.783966,-0.067642 0.542277,-0.1263538 1.955512,0.1047664 2.340029,0.1483322 0.384474,0.043476 1.659552,0.3974598 1.998389,0.5100637 0.338784,0.1125181 8.495547,1.9638063 9.269088,3.8015464 0.105653,0.2509024 -3.392457,0.4822182 -4.377126,1.1993501 -4.246904,1.9683461 -9.564612,0.149752 -16.738816,1.1127632 -1.26555,0.1699025 -11.66914,-0.2082448 -12.08907,-0.1779474 z"
         id="path77-9-1-4-6"
         sodipodi:nodetypes="cscssssccsssscsc" />
      <path
         style="fill:none;stroke:#272398;stroke-width:0.2;stroke-dasharray:none;stroke-opacity:1"
         d="m -102.14735,7.1613118 c -1.69779,0.00914 -4.173,0.5051678 -4.80528,0.2395784 -0.6323,-0.2656838 -1.85307,-0.4892163 -1.53168,-0.6939331 0.32143,-0.2046311 1.14625,-0.6925722 1.42362,-0.6373959 0.27707,0.054546 1.12244,0.6340842 1.85094,0.496461"
         id="path79-0-4-4-9" />
      <path
         style="fill:none;stroke:#272398;stroke-width:0.2;stroke-dasharray:none;stroke-opacity:1"
         d="m -105.82979,5.751976 c 0.8328,-0.225437 1.03353,-0.030835 1.73944,-0.010432"
         id="path80-7-3-1-7" />
      <path
         style="fill:none;stroke:#272398;stroke-width:0.2;stroke-dasharray:none;stroke-opacity:1"
         d="m -101.41056,5.1845765 c 2.094163,-0.3625869 2.192767,-0.3099383 2.447422,-0.2726828"
         id="path81-6-5-5-1" />
      <path
         style="fill:none;stroke:#272398;stroke-width:0.2;stroke-dasharray:none;stroke-opacity:1"
         d="m -98.054536,4.9786912 c 0.63569,-0.00839 0.785744,-0.1182278 1.38708,0.024527"
         id="path82-3-1-5-1" />
      <path
         style="fill:none;stroke:#272398;stroke-width:0.2;stroke-dasharray:none;stroke-opacity:1"
         d="m -95.629187,5.1110442 c 1.080847,0.096769 1.851225,0.1925758 2.411233,0.3490047"
         id="path83-0-9-3-1" />
      <path
         style="fill:none;stroke:#272398;stroke-width:0.2;stroke-dasharray:none;stroke-opacity:1"
         d="m -92.708301,5.5059848 c 0.691836,0.1492527 3.586868,0.9355126 4.876635,1.6362236"
         id="path84-0-6-0-3" />
      <rect
         style="fill:none;stroke:none;stroke-width:0.2"
         id="rect1-3"
         width="156.64949"
         height="128.91223"
         x="-157.91286"
         y="-58.270134" />
    </g>
    <g
       id="frame3"
       inkscape:label="frame3"
       transform="translate(157.48369,111.28677)"
       style="display:inline;stroke:#272398;stroke-opacity:1">
      <path
         style="fill:#ffffff;fill-opacity:1;stroke:#272398;stroke-width:0.2;stroke-dasharray:none;stroke-opacity:1"
         d="m -69.67999,-47.23818 c 0.219502,-3.569334 2.783673,-6.203395 5.331682,-7.193177 1.925166,-0.747761 8.709084,-2.271655 12.445085,-3.143662 2.007119,-0.46845 24.84024,-8.299996 26.812271,-10.646934 -5.627365,-0.537134 -26.827934,0.918585 -31.057813,1.607149 -6.501396,1.058334 -20.689313,7.47972 -23.047847,11.508373 -1.251891,2.138377 -0.02407,8.468833 0.810245,8.382196 0.834311,-0.08664 7.914442,0.343874 8.706377,-0.513945 z"
         id="path76-9-5-0-8-8-6"
         sodipodi:nodetypes="csscsssc" />
      <path
         style="fill:none;stroke:#272398;stroke-width:0.2;stroke-dasharray:none;stroke-opacity:1"
         d="m -24.924899,-68.214508 c -1.567107,-0.161269 -7.487642,-0.339734 -8.221426,-0.170368 -0.733792,0.169469 -17.021847,5.311594 -19.887195,7.476322 -0.38103,0.287842 -2.904285,2.270313 -3.684255,2.411267"
         id="path62-1-6-3-7-7-3"
         sodipodi:nodetypes="ccsc" />
      <path
         style="fill:#a7b5ca;fill-opacity:1;stroke:#272398;stroke-width:0.2;stroke-dasharray:none;stroke-opacity:1"
         d="m -31.356152,-68.336207 c -0.620278,-1.228941 -7.865708,0.145975 -8.3704,0.346995 -0.504705,0.200814 -12.063673,4.810872 -14.500458,6.779017 -1.129935,0.912533 -3.420755,2.37205 -3.937122,2.479575"
         id="path63-1-0-3-7-8-5"
         sodipodi:nodetypes="cssc" />
      <path
         style="fill:none;stroke:#272398;stroke-width:0.2;stroke-dasharray:none;stroke-opacity:1"
         d="m -40.311741,-67.688551 c -0.567457,-0.902007 -3.865994,0.284296 -4.16649,0.391325 -0.300493,0.107235 -11.014356,5.346988 -11.481996,5.640472 -0.46764,0.293484 -3.300113,2.764065 -3.775478,2.894192"
         id="path64-0-7-5-0-2-8"
         sodipodi:nodetypes="ccsc" />
      <path
         style="fill:none;stroke:#272398;stroke-width:0.2;stroke-dasharray:none;stroke-opacity:1"
         d="m -44.670309,-67.079966 c -0.559375,-0.971108 -4.486046,0.105727 -4.984095,0.246976 -0.49802,0.142385 -7.706871,4.133965 -8.882333,5.416387 -1.175462,1.282422 -3.359685,2.849614 -3.515121,2.974664"
         id="path65-5-8-7-9-8-6"
         sodipodi:nodetypes="ccsc" />
      <path
         style="fill:#a7b5ca;fill-opacity:1;stroke:#272398;stroke-width:0.2;stroke-dasharray:none;stroke-opacity:1"
         d="m -50.188136,-66.626847 c -0.719512,-1.180803 -4.645178,0.380567 -5.212248,0.629129 -0.567062,0.248459 -5.570889,4.066187 -6.301208,5.324132 -0.73031,1.257946 -2.217813,2.557001 -2.493972,2.582154"
         id="path66-6-5-1-2-1-1"
         sodipodi:nodetypes="cssc" />
      <path
         style="fill:none;stroke:#272398;stroke-width:0.2;stroke-dasharray:none;stroke-opacity:1"
         d="m -56.342187,-65.292971 c -0.544016,-0.989763 -2.604924,0.153028 -2.971113,0.385825 -0.366178,0.232901 -3.638988,3.077799 -4.610625,4.958628 -0.420303,0.813563 -1.086962,1.857983 -1.742056,2.215096"
         id="path67-6-6-3-4-9-7"
         sodipodi:nodetypes="ccsc" />
      <path
         style="fill:none;stroke:#272398;stroke-width:0.2;stroke-dasharray:none;stroke-opacity:1"
         d="m -59.76169,-64.537868 c -0.47268,-1.242603 -2.48335,0.369758 -2.860747,0.796723 -0.377405,0.427068 -2.563859,3.912128 -3.118781,4.688577 -0.554932,0.776449 -1.54346,1.836421 -2.01455,2.467161"
         id="path68-4-4-9-6-6-1"
         sodipodi:nodetypes="cssc" />
      <path
         style="fill:none;stroke:#272398;stroke-width:0.2;stroke-dasharray:none;stroke-opacity:1"
         d="m -62.533863,-63.862114 c -0.549588,-0.475962 -1.953722,-0.03248 -2.290685,0.451844 -0.336977,0.484113 -1.798428,4.248205 -2.241918,4.808287 -0.443501,0.560082 -1.388734,1.631761 -1.480666,2.165469"
         id="path69-0-9-6-6-4-4"
         sodipodi:nodetypes="cssc" />
      <path
         style="fill:none;stroke:#272398;stroke-width:0.2;stroke-dasharray:none;stroke-opacity:1"
         d="m -65.001758,-63.263049 c -0.810508,-0.557252 -2.305555,0.673059 -2.232508,0.762458 0.383518,0.469344 -0.920797,3.437578 -1.253104,3.98769 -0.332309,0.550009 -0.771468,1.37825 -1.156444,1.780624"
         id="path70-0-7-5-4-0-8"
         sodipodi:nodetypes="cssc" />
      <path
         style="fill:none;stroke:#272398;stroke-width:0.2;stroke-dasharray:none;stroke-opacity:1"
         d="m -67.279197,-62.169798 c -0.685075,-0.828651 -2.704195,0.468776 -2.876251,0.933674 -0.172064,0.465001 -0.921472,2.286497 -0.865947,3.275897 0.05553,0.9894 -0.239615,1.394455 -0.421466,1.698512"
         id="path71-9-7-4-9-1-0"
         sodipodi:nodetypes="cssc" />
      <path
         style="fill:none;stroke:#272398;stroke-width:0.2;stroke-dasharray:none;stroke-opacity:1"
         d="m -70.197857,-60.971344 c -0.919055,-0.527782 -2.204117,0.741317 -2.447526,1.23622 -0.243408,0.495007 -0.331593,3.003151 -0.545839,3.96807"
         id="path72-5-5-1-0-7-4"
         sodipodi:nodetypes="csc" />
      <path
         style="fill:none;stroke:#272398;stroke-width:0.2;stroke-dasharray:none;stroke-opacity:1"
         d="m -72.774695,-59.514331 c -0.768845,-0.567233 -2.109491,0.818166 -2.165048,1.380238 -0.05551,0.562072 0.0084,2.696431 0.132834,3.515546"
         id="path73-3-7-7-9-9-9"
         sodipodi:nodetypes="csc" />
      <path
         style="fill:none;stroke:#272398;stroke-width:0.2;stroke-dasharray:none;stroke-opacity:1"
         d="m -75.038013,-58.128366 c -0.826812,-0.376341 -1.846702,1.462046 -1.97973,1.897462 -0.133028,0.435417 -0.07453,0.968447 0.02468,1.771426 0.09922,0.803083 0.461326,0.541398 0.485171,0.904063"
         id="path74-4-3-2-1-2-9"
         sodipodi:nodetypes="cssc" />
      <path
         style="fill:none;stroke:#272398;stroke-width:0.2;stroke-dasharray:none;stroke-opacity:1"
         d="m -77.295325,-56.45793 c -0.711568,0.71808 -1.51298,1.340829 -1.352193,1.94531 0.133186,0.5008 0.131867,1.072231 0.134022,1.427078 0.0017,0.354854 -0.297165,1.944049 -0.297165,1.944049"
         id="path75-5-3-2-7-8-2"
         sodipodi:nodetypes="cscc" />
      <path
         style="fill:#ffffff;fill-opacity:1;stroke:#272398;stroke-width:0.2;stroke-dasharray:none;stroke-opacity:1"
         d="m -85.502657,-40.110695 c -2.442316,-2.577251 -9.004133,-6.603949 -11.320266,-7.539319 -2.316152,-0.935467 -8.491647,-1.476703 -10.372067,-2.276667 -1.88039,-0.799867 -11.00719,-2.991409 -12.96117,-3.565779 -1.954,-0.574467 -26.80422,-2.141974 -28.11602,-2.116821 4.89619,-3.672266 27.34729,-7.143527 35.94711,-5.843962 8.59983,1.299565 27.569058,9.444109 29.205591,11.523413 1.636534,2.079305 -0.691067,8.77968 -2.383178,9.819135 z"
         id="path76-9-59-7-8-0"
         sodipodi:nodetypes="cccccssc" />
      <path
         style="fill:#ffffff;fill-opacity:1;stroke:#272398;stroke-width:0.2;stroke-dasharray:none;stroke-opacity:1"
         d="m -105.48718,-48.263157 c 0.7731,-0.0102 14.450998,3.21482 15.300298,3.10563 4.1684,-1.50859 9.4525,-3.16777 13.4897,-0.53484 3.031,-3.12038 8.6873,-1.83233 10.0542,0.99476 0.6476,1.33944 0.3562,2.33919 0.9337,3.53757 0.6254,1.29767 1.6137,2.22833 1.2312,3.75959 -0.6211,-0.43533 -1.2417,-1.18176 -1.9903,-1.37623 -0.8207,-0.2132 -2.2765,0.67771 -5.3397,0.87037 -0.6821,0.71761 -7.8919,3.8953 -15.5196,0.55269 l -0.1086,-0.13581 c -0.3678,-0.097 -3.6709,-1.54488 -4.2784,-1.79901 -0.6075,-0.25413 -3.5656,0.46361 -4.63469,0.43835 -8.081728,0.11442 -9.713838,-9.40547 -9.137808,-9.41307 z m 10.505598,9.07735 0.2336,-1.09083 c -1.8961,-1.65825 -1.439,-2.33628 -0.8154,-3.17175 0.6235,-0.83548 4.3795,-1.27319 5.2627,-1.51248 0,0 -3.6912,2.04524 -2.492,2.76677 2.4243,-1.74873 10.2575,-3.97537 11.3391,-2.75847 1.6163,1.81834 1.6678,7.46682 -1.4356,7.0722 -3.1034,-0.39462 -9.7487,-2.49151 -7.6425,-3.50514 2.1062,-1.01363 7.859,-2.78101 8.0121,-0.85115 0.1978,2.49152 -3.8857,1.35407 -3.8857,1.35407"
         id="path195-2-1-9"
         sodipodi:nodetypes="sccsscscccscscccccssssc" />
      <path
         style="fill:#a7b5ca;fill-opacity:1;stroke:#272398;stroke-width:0.2;stroke-dasharray:none;stroke-opacity:1"
         d="m -52.028406,-57.819956 c -0.0339,-0.679331 -0.801129,-2.98829 -1.17195,-3.145664 -0.370815,-0.15727 -2.633475,-0.610871 -2.930168,-0.582698 -0.296686,0.02859 -2.176937,0.134517 -2.464833,0.235344 -0.287905,0.100828 -2.607684,0.3544 -3.153051,0.710461 -0.545357,0.356061 -2.001782,0.756033 -2.333831,0.796464 -0.332057,0.04053 -1.017352,0.538663 -1.633584,0.752967 -0.616232,0.2142 -2.254824,0.50038 -2.797165,0.415788 l -2.368525,0.624134 c -0.884869,0.458758 -1.977063,1.091799 -2.5184,1.226097 -0.541328,0.134194 -1.247614,0.757454 -2.185193,1.725661 -1.069766,1.104712 -2.513617,3.025084 -3.313992,3.85129 -0.879898,0.908295 -0.729523,4.032064 0.256744,4.500042 1.228008,0.582683 7.062165,-1.711008 8.436559,-0.203609 0.855074,-2.323219 1.109411,-5.813384 6.206405,-7.908592 1.340751,-0.551139 10.266451,-2.79522 11.970984,-2.997685 z"
         id="path77-9-5-3-8-0-2"
         sodipodi:nodetypes="cscssssccsssscsc" />
      <path
         style="fill:none;stroke:#272398;stroke-width:0.2;stroke-dasharray:none;stroke-opacity:1"
         d="m -66.4241,-53.509196 c 1.521433,-0.777415 3.956097,-1.464559 4.402002,-2.002758 0.445893,-0.538303 1.436609,-1.31002 1.057534,-1.350517 -0.379084,-0.04039 -1.335151,-0.109704 -1.558286,0.06969 -0.223146,0.178676 -0.718632,1.105753 -1.431446,1.315727"
         id="path79-0-3-6-6-7-5" />
      <path
         style="fill:none;stroke:#272398;stroke-width:0.2;stroke-dasharray:none;stroke-opacity:1"
         d="m -63.765402,-56.516628 c -0.845424,0.177067 -0.937509,0.44989 -1.559235,0.795503"
         id="path80-7-7-0-7-1-3" />
      <path
         style="fill:none;stroke:#272398;stroke-width:0.2;stroke-dasharray:none;stroke-opacity:1"
         d="m -67.969478,-54.995628 c -2.03425,0.634129 -2.098752,0.728444 -2.309623,0.88076"
         id="path81-6-7-5-0-3-7" />
      <path
         style="fill:none;stroke:#272398;stroke-width:0.2;stroke-dasharray:none;stroke-opacity:1"
         d="m -71.061155,-53.632544 c -0.571887,0.286485 -0.75527,0.254401 -1.228639,0.66472"
         id="path82-3-7-7-6-7-6" />
      <path
         style="fill:none;stroke:#272398;stroke-width:0.2;stroke-dasharray:none;stroke-opacity:1"
         d="m -73.169325,-52.387549 c -0.922543,0.58976 -1.56805,1.034922 -1.998349,1.438753"
         id="path83-0-0-4-4-8-5" />
      <path
         style="fill:none;stroke:#272398;stroke-width:0.2;stroke-dasharray:none;stroke-opacity:1"
         d="m -75.602544,-50.670423 c -0.551334,0.458218 -2.785873,2.525148 -3.62416,3.769952"
         id="path84-0-9-0-1-2-4" />
      <path
         style="fill:none;stroke:#272398;stroke-width:0.2;stroke-dasharray:none;stroke-opacity:1"
         d="m -96.0289,-38.88523 c -0.7702,-0.22984 -1.4844,-0.76853 -1.4645,-1.20667 0.02,-0.43814 1.7758,-0.13288 2.1868,-0.51715"
         id="path55-3-0-7-0-8" />
      <path
         style="fill:#a7b5ca;fill-opacity:1;stroke:#272398;stroke-width:0.2;stroke-dasharray:none;stroke-opacity:1"
         d="m -97.3901,-40.20599 c -0.6081,0.0241 -2.9135,-0.85706 -2.4718,-1.53509 0.5493,-0.71497 3.2418,0.2411 3.9545,-0.34712"
         id="path56-7-0-3-2-9"
         sodipodi:nodetypes="ccc" />
      <path
         style="fill:none;stroke:#272398;stroke-width:0.2;stroke-dasharray:none;stroke-opacity:1"
         d="m -99.8196,-41.79568 c -0.7054,-0.23616 -2.967,-1.26209 -2.9952,-2.40229 -0.079,-0.85706 4.3492,1.41121 7.336,0.9503"
         id="path57-3-9-4-6-0"
         sodipodi:nodetypes="ccc" />
      <path
         style="fill:#a7b5ca;fill-opacity:1;stroke:#272398;stroke-width:0.2;stroke-dasharray:none;stroke-opacity:1"
         d="m -102.7301,-44.30336 c -0.3866,-0.0965 -2.4281,-1.48049 -2.2856,-2.69815 0.1425,-1.21766 5.1813,2.95036 10.3774,3.09638"
         id="path58-2-8-5-9-1"
         sodipodi:nodetypes="csc" />
      <path
         style="fill:none;stroke:#272398;stroke-width:0.2;stroke-dasharray:none;stroke-opacity:1"
         d="m -100.6433,-47.24981 c 1.5849,0.76091 4.7405,2.19076 7.2408,2.92252"
         id="path60-3-1-6-0-4"
         sodipodi:nodetypes="cc" />
      <path
         style="fill:#a7b5ca;fill-opacity:1;stroke:#272398;stroke-width:0.2;stroke-dasharray:none;stroke-opacity:1"
         d="m -75.8887,-46.88902 c -0.8959,0.37492 -2.5752,2.01589 -2.5269,2.87523 0.038,0.6776 1.0228,0.65315 1.116,1.20605 0.093,0.55292 -2.2175,-0.66645 -2.0716,1.92499 0.1731,3.07594 2.2618,-0.29256 2.3627,1.08583 0.1009,1.37834 -0.9779,0.75156 -0.8588,1.9425 0.1622,1.62238 2.847,1.90451 3.1908,1.70971 -0.2511,-1.49116 -1.3454,-3.65768 -1.4865,-5.28099 z"
         id="path87-5-7-8-3"
         sodipodi:nodetypes="csssssccc" />
      <path
         style="fill:#ffffff;fill-opacity:1;stroke:#272398;stroke-width:0.2;stroke-dasharray:none;stroke-opacity:1"
         d="m -64.7904,-37.86384 c -0.5971,-0.52617 -4.3431,-1.24614 -4.6475,-0.94759 -0.7091,0.69534 -0.578,-0.82533 -0.2546,-1.46321 1.1035,0.11703 4.9021,2.4108 4.9021,2.4108 z"
         id="path88-6-5-8-8"
         sodipodi:nodetypes="cscc" />
      <path
         style="fill:#a7b5ca;fill-opacity:1;stroke:#272398;stroke-width:0.2;stroke-dasharray:none;stroke-opacity:1"
         d="m -68.2938,-44.64778 c -1.1433,-0.63062 -2.8627,-0.97494 -2.91,-0.72735 -0.047,0.24762 1.8741,0.56485 2.0503,0.82405 0.1762,0.25922 -0.6748,0.47586 -1.0574,0.5726 -0.3825,0.0967 1.5646,0.20504 1.9171,-0.6693 z"
         id="path85-4-4-3-6" />
      <path
         style="fill:none;fill-opacity:1;stroke:#272398;stroke-width:0.2;stroke-dasharray:none;stroke-opacity:1"
         d="m -65.5075,-41.31328 c -1.3583,-0.2206 -5.3772,1.18775 -4.7067,1.09877 0.6706,-0.089 3.9706,1.40544 4.3747,1.58727"
         id="path86-7-3-2-4"
         sodipodi:nodetypes="csc" />
      <path
         style="fill:none;stroke:#272398;stroke-width:0.2;stroke-dasharray:none;stroke-opacity:1"
         d="m -148.43324,-55.568266 c 1.50189,-0.473213 7.26169,-1.853227 8.01363,-1.843015 0.75197,0.01031 17.71811,1.545751 20.95336,3.008647 0.43021,0.194515 3.29435,1.554874 4.08585,1.528745"
         id="path62-1-3-9-4-9"
         sodipodi:nodetypes="ccsc" />
      <path
         style="fill:#a7b5ca;fill-opacity:1;stroke:#272398;stroke-width:0.2;stroke-dasharray:none;stroke-opacity:1"
         d="m -140.65752,-57.572275 c 0.58871,-1.208516 4.59608,-1.379828 5.13001,-1.293085 0.53397,0.08684 14.39286,2.568584 17.16951,3.933071 1.28751,0.632623 3.82013,1.545525 4.34696,1.541677"
         id="path63-1-5-8-2-7"
         sodipodi:nodetypes="cssc" />
      <path
         style="fill:none;stroke:#272398;stroke-width:0.2;stroke-dasharray:none;stroke-opacity:1"
         d="m -135.33614,-59.047762 c 0.37607,-0.969872 3.84075,-0.521716 4.15618,-0.481877 0.31546,0.04004 13.91359,3.637979 14.4297,3.820117 0.51612,0.182138 3.78001,1.941266 4.2712,1.967198"
         id="path64-0-5-7-4-6"
         sodipodi:nodetypes="ccsc" />
      <path
         style="fill:none;stroke:#272398;stroke-width:0.2;stroke-dasharray:none;stroke-opacity:1"
         d="m -130.98993,-59.523178 c 0.35442,-1.033627 4.41218,-0.817576 4.92778,-0.785757 0.5158,0.0329 10.47602,3.326257 11.88166,4.299685 1.40564,0.973428 3.85533,2.010055 4.03235,2.096626"
         id="path65-5-4-5-0-9"
         sodipodi:nodetypes="ccsc" />
      <path
         style="fill:#a7b5ca;fill-opacity:1;stroke:#272398;stroke-width:0.2;stroke-dasharray:none;stroke-opacity:1"
         d="m -125.28803,-60.214089 c 0.46946,-1.264871 4.6226,-0.589979 5.2271,-0.470701 0.60448,0.119182 8.16107,3.690133 9.12611,4.731449 0.96504,1.041319 2.67942,1.966661 2.95474,1.933979"
         id="path66-6-55-6-4-4"
         sodipodi:nodetypes="cssc" />
      <path
         style="fill:none;stroke:#272398;stroke-width:0.2;stroke-dasharray:none;stroke-opacity:1"
         d="m -119.54132,-60.56952 c 0.33567,-1.048143 3.64627,-0.247363 4.05101,-0.101915 0.40475,0.145548 5.54988,3.368269 6.87501,4.949813 0.57321,0.684102 1.43348,1.536329 2.14573,1.740351"
         id="path67-6-3-5-8-6"
         sodipodi:nodetypes="ccsc" />
      <path
         style="fill:none;stroke:#272398;stroke-width:0.2;stroke-dasharray:none;stroke-opacity:1"
         d="m -114.83573,-60.387151 c 0.21556,-1.272876 2.99085,-0.137368 3.44518,0.189576 0.45435,0.327041 4.03468,4.33084 4.73228,4.952275 0.69761,0.621433 1.87603,1.422539 2.46259,1.923201"
         id="path68-4-8-9-5-4"
         sodipodi:nodetypes="cssc" />
      <path
         style="fill:none;stroke:#272398;stroke-width:0.2;stroke-dasharray:none;stroke-opacity:1"
         d="m -111.14423,-60.058061 c 0.29445,-0.891922 2.30697,0.01467 2.73309,0.403982 0.42612,0.389306 2.5942,4.124765 3.1397,4.564191 0.5455,0.439424 1.68387,1.260469 1.88,1.746845"
         id="path69-0-5-3-7-6"
         sodipodi:nodetypes="cssc" />
      <path
         style="fill:none;stroke:#272398;stroke-width:0.2;stroke-dasharray:none;stroke-opacity:1"
         d="m -108.20841,-59.550976 c 0.3921,-1.002086 2.01837,-0.230347 2.33692,0.265029 0.31853,0.495278 1.57393,3.536991 2.00861,3.989724 0.43466,0.452635 1.02925,1.146774 1.4861,1.448891"
         id="path70-0-1-2-9-7"
         sodipodi:nodetypes="cssc" />
      <path
         style="fill:none;stroke:#272398;stroke-width:0.2;stroke-dasharray:none;stroke-opacity:1"
         d="m -105.76172,-58.982026 c 0.50578,-0.924496 2.74022,-0.109442 3.00109,0.295412 0.2609,0.40495 1.34567,2.447296 1.48808,3.395171 0.14242,0.947875 0.51187,1.270908 0.75034,1.521514"
         id="path71-9-5-3-1-3"
         sodipodi:nodetypes="cssc" />
      <path
         style="fill:none;stroke:#272398;stroke-width:0.2;stroke-dasharray:none;stroke-opacity:1"
         d="m -102.66646,-58.444661 c 0.79465,-0.687572 2.30492,0.250826 2.6416,0.669486 0.336706,0.418757 0.910794,3.246309 1.312406,4.115827"
         id="path72-5-8-0-1-3"
         sodipodi:nodetypes="csc" />
      <path
         style="fill:none;stroke:#272398;stroke-width:0.2;stroke-dasharray:none;stroke-opacity:1"
         d="m -99.854371,-57.592635 c 0.639772,-0.694188 2.227579,0.342923 2.393744,0.863588 0.166115,0.520675 0.517084,3.025513 0.558062,3.826324"
         id="path73-3-77-3-5-4"
         sodipodi:nodetypes="csc" />
      <path
         style="fill:none;stroke:#272398;stroke-width:0.2;stroke-dasharray:none;stroke-opacity:1"
         d="m -97.363297,-56.743728 c 0.734476,-0.525356 2.154731,0.515321 2.371539,0.900252 0.216807,0.384932 0.198185,1.863767 0.260783,2.644118 0.0626,0.780453 -0.343897,0.606828 -0.295112,0.954986"
         id="path74-4-0-2-9-5"
         sodipodi:nodetypes="cssc" />
      <path
         style="fill:none;stroke:#272398;stroke-width:0.2;stroke-dasharray:none;stroke-opacity:1"
         d="m -94.821529,-55.624326 c 0.728542,-0.887169 1.763985,0.458934 1.766793,1.07391 0.0023,0.501635 -0.02593,2.310235 0.04253,2.646557"
         id="path75-5-4-6-3-1"
         sodipodi:nodetypes="csc" />
      <path
         style="fill:none;stroke:#272398;stroke-width:0.2;stroke-dasharray:none;stroke-opacity:1"
         d="m -93.129321,-55.009903 c 0.769715,-0.764341 1.912758,0.364784 1.893132,0.992027 -0.01568,0.501424 -0.03709,2.249956 0.03138,2.586278"
         id="path75-5-4-6-3-1-2"
         sodipodi:nodetypes="csc" />
      <path
         style="fill:none;stroke:#272398;stroke-width:0.2;stroke-dasharray:none;stroke-opacity:1"
         d="m -91.317647,-54.393957 c 0.769715,-0.76434 1.912759,0.364784 1.893132,0.992027 -0.01568,0.501424 -0.207997,2.443897 -0.139537,2.780219"
         id="path75-5-4-6-3-1-2-2"
         sodipodi:nodetypes="csc" />
      <path
         style="fill:none;stroke:#272398;stroke-width:0.2;stroke-dasharray:none;stroke-opacity:1"
         d="m -89.352999,-53.633137 c 0.769715,-0.764341 1.912749,0.364785 1.893132,0.992027 -0.01568,0.501423 -0.397489,2.726453 -0.329028,3.062775"
         id="path75-5-4-6-3-1-2-0"
         sodipodi:nodetypes="csc" />
      <path
         style="fill:none;stroke:#272398;stroke-width:0.2;stroke-dasharray:none;stroke-opacity:1"
         d="m -87.450353,-52.719425 c 0.929425,-0.559356 1.771088,0.809318 1.602825,1.413874 -0.134511,0.48328 -0.652975,2.417208 -0.666481,2.760158"
         id="path75-5-4-6-3-1-2-5"
         sodipodi:nodetypes="csc" />
      <path
         style="fill:none;stroke:#272398;stroke-width:0.2;stroke-dasharray:none;stroke-opacity:1"
         d="m -85.794601,-51.786553 c 1.045566,-0.289048 1.488098,1.255928 1.163413,1.792961 -0.259559,0.429264 -1.279148,2.1524 -1.384403,2.479116"
         id="path75-5-4-6-3-1-2-5-5"
         sodipodi:nodetypes="csc" />
      <path
         style="fill:none;stroke:#272398;stroke-width:0.2;stroke-dasharray:none;stroke-opacity:1"
         d="m -84.550136,-51.190446 c 1.082294,-0.07371 1.526903,1.254154 1.23404,1.809191 -0.318008,0.602553 -1.74005,2.411078 -1.908642,2.709976"
         id="path75-5-4-6-3-1-2-5-5-2"
         sodipodi:nodetypes="csc" />
      <path
         style="fill:none;stroke:#272398;stroke-width:0.2;stroke-dasharray:none;stroke-opacity:1"
         d="m -83.165736,-50.285537 c 1.082293,-0.07371 1.526903,1.254154 1.23404,1.809191 -0.318008,0.602552 -0.870629,1.230657 -1.039221,1.529554"
         id="path75-5-4-6-3-1-2-5-5-2-4"
         sodipodi:nodetypes="csc" />
      <path
         style="fill:#a7b5ca;fill-opacity:1;stroke:#272398;stroke-width:0.2;stroke-dasharray:none;stroke-opacity:1"
         d="m -119.34262,-53.295631 c -0.10192,-0.649956 -0.30335,-0.97033 0.0283,-1.195146 0.3317,-0.224717 2.45628,-1.116917 2.7523,-1.15094 0.2961,-0.03363 2.15764,-0.317981 2.4595,-0.281434 0.30187,0.03654 2.623,-0.197963 3.22764,0.02751 0.60463,0.225473 2.10979,0.306145 2.44286,0.276491 0.33309,-0.02956 1.10296,0.301765 1.74877,0.37856 0.6458,0.0767 2.30664,0.01239 2.82069,-0.178616 l 2.44254,0.106275 c 0.95739,0.253231 2.152375,0.629021 2.708969,0.645406 0.556565,0.01629 1.86395,0.600578 2.224599,0.740875 0.360631,0.140199 1.503069,0.808005 1.801925,1.003389 0.298827,0.195288 1.11447,0.929729 2.191587,1.106424 2.974994,0.488029 8.32873,4.723066 6.689934,5.171333 -1.44495,0.395232 -3.339923,0.560049 -6.122581,1.806966 -4.625813,-4.631934 -8.591793,-4.297812 -15.774093,-5.198446 -1.26698,-0.158849 -11.22921,-3.18072 -11.64296,-3.258645 z"
         id="path77-9-1-4-6-0"
         sodipodi:nodetypes="cscssssccssssscsc" />
      <path
         style="fill:none;stroke:#272398;stroke-width:0.2;stroke-dasharray:none;stroke-opacity:1"
         d="m -104.88739,-50.137907 c -1.64386,-0.424643 -4.16368,-0.577031 -4.70718,-0.995251 -0.54352,-0.41832 -1.66675,-0.946131 -1.30375,-1.062006 0.36303,-0.115779 1.28509,-0.376955 1.53918,-0.252788 0.25396,0.123479 0.92334,0.899649 1.66283,0.952589"
         id="path79-0-4-4-9-0" />
      <path
         style="fill:none;stroke:#272398;stroke-width:0.2;stroke-dasharray:none;stroke-opacity:1"
         d="m -108.08795,-52.440738 c 0.86275,-0.0053 1.00715,0.23407 1.68446,0.434031"
         id="path80-7-3-1-7-6" />
      <path
         style="fill:none;stroke:#272398;stroke-width:0.2;stroke-dasharray:none;stroke-opacity:1"
         d="m -103.67032,-51.861008 c 2.11733,0.184114 2.19922,0.260194 2.43593,0.361233"
         id="path81-6-5-5-1-9" />
      <path
         style="fill:none;stroke:#272398;stroke-width:0.2;stroke-dasharray:none;stroke-opacity:1"
         d="m -100.37296,-51.203206 c 0.616764,0.15419 0.789887,0.08631 1.334845,0.377865"
         id="path82-3-1-5-1-7" />
      <path
         style="fill:none;stroke:#272398;stroke-width:0.2;stroke-dasharray:none;stroke-opacity:1"
         d="m -98.061788,-50.455997 c 1.020315,0.369525 1.740699,0.65885 2.242207,0.953077"
         id="path83-0-9-3-1-3" />
      <path
         style="fill:none;stroke:#272398;stroke-width:0.2;stroke-dasharray:none;stroke-opacity:1"
         d="m -95.338548,-49.328382 c 0.630798,0.320947 3.229129,1.82031 4.297243,2.827101"
         id="path84-0-6-0-3-0" />
      <rect
         style="fill:none;stroke:none;stroke-width:0.2"
         id="rect1-7"
         width="156.64949"
         height="128.91223"
         x="-157.48369"
         y="-111.28677" />
    </g>
    <g
       id="frame2"
       inkscape:label="frame2"
       transform="translate(157.48369,168.43679)"
       style="display:inline;stroke:#272398;stroke-opacity:1">
      <path
         style="fill:#ffffff;fill-opacity:1;stroke:#272398;stroke-width:0.2;stroke-dasharray:none;stroke-opacity:1"
         d="m -69.750506,-104.52529 c 0.585906,-4.69735 4.753497,-7.04085 6.49038,-8.3833 1.885078,-1.45699 9.141243,-3.52734 11.434473,-4.58025 7.158089,-3.28674 20.204949,-16.41462 20.716064,-22.24764 -4.405591,1.20098 -22.784505,12.69492 -25.279416,13.74901 -2.494911,1.05409 -17.10338,6.93823 -20.92998,12.45417 -3.826601,5.51593 -3.433512,8.11506 -2.727556,8.55547 0.705955,0.44041 9.208536,1.52599 10.296035,0.45254 z"
         id="path76-9-5-0-8-8-6-3"
         sodipodi:nodetypes="cssc" />
      <path
         style="fill:none;stroke:#272398;stroke-width:0.2;stroke-dasharray:none;stroke-opacity:1"
         d="m -33.54543,-133.98974 c -0.693054,0.2947 -17.209482,14.1041 -19.650233,14.59145 -0.468251,0.0937 -2.795074,1.00275 -3.538551,1.27745"
         id="path62-1-6-3-7-7-3-3"
         sodipodi:nodetypes="csc" />
      <path
         style="fill:#a7b5ca;fill-opacity:1;stroke:#272398;stroke-width:0.2;stroke-dasharray:none;stroke-opacity:1"
         d="m -31.110994,-139.51688 c -1.146252,-0.75691 -3.968504,1.33763 -4.63703,1.90638 -10.838321,9.22078 -11.62704,12.08646 -17.270609,16.24418"
         id="path63-1-0-3-7-8-5-4"
         sodipodi:nodetypes="csc" />
      <path
         style="fill:none;stroke:#272398;stroke-width:0.2;stroke-dasharray:none;stroke-opacity:1"
         d="m -37.719669,-135.7533 c -0.533615,-1.24639 -5.097308,2.02659 -5.558055,2.9533 -0.277327,0.15749 -12.851593,11.06525 -13.260975,11.43567 -0.409348,0.37052 -2.76818,3.29666 -3.213617,3.50759"
         id="path64-0-7-5-0-2-8-6"
         sodipodi:nodetypes="ccsc" />
      <path
         style="fill:none;stroke:#272398;stroke-width:0.2;stroke-dasharray:none;stroke-opacity:1"
         d="m -44.283595,-132.07279 c -0.54165,-1.14646 -4.822612,1.67803 -5.366477,2.76319 -0.465595,0.22701 -8.449738,7.16326 -9.383841,8.63086 -0.934093,1.46759 -2.811932,3.39131 -2.943196,3.54155"
         id="path65-5-8-7-9-8-6-5"
         sodipodi:nodetypes="ccsc" />
      <path
         style="fill:#a7b5ca;fill-opacity:1;stroke:#272398;stroke-width:0.2;stroke-dasharray:none;stroke-opacity:1"
         d="m -50.33162,-128.92525 c -0.691367,0.11918 -5.013042,2.5788 -5.528286,2.92179 -0.515108,0.34349 -5.661018,5.24172 -6.161045,6.60768 -0.500017,1.36595 -1.738495,2.90424 -2.006037,2.97715"
         id="path66-6-5-1-2-1-1-5"
         sodipodi:nodetypes="cssc" />
      <path
         style="fill:none;stroke:#272398;stroke-width:0.2;stroke-dasharray:none;stroke-opacity:1"
         d="m -56.346135,-125.39161 c -0.708106,-0.87984 -3.194528,1.0932 -3.514585,1.38614 -0.405463,0.63421 -3.593114,3.68951 -4.222293,5.71074 -0.272148,0.87438 -0.746701,2.01893 -1.329547,2.48477"
         id="path67-6-6-3-4-9-7-4"
         sodipodi:nodetypes="ccsc" />
      <path
         style="fill:none;stroke:#272398;stroke-width:0.2;stroke-dasharray:none;stroke-opacity:1"
         d="m -60.047626,-123.55794 c -0.986584,-0.44246 -2.831505,0.57602 -3.128759,1.06218 -0.297247,0.48628 -2.128875,4.53864 -2.540077,5.39984 -0.411176,0.8613 -1.199969,2.07722 -1.553967,2.78044"
         id="path68-4-4-9-6-6-1-6"
         sodipodi:nodetypes="cssc" />
      <path
         style="fill:none;stroke:#272398;stroke-width:0.2;stroke-dasharray:none;stroke-opacity:1"
         d="m -63.452162,-122.17475 c -0.777925,-0.24713 -2.091754,0.15553 -2.339209,0.69107 -0.24749,0.53545 -0.812376,4.43379 -1.151525,5.06256 -0.339158,0.62877 -1.083254,1.84875 -1.080825,2.39028"
         id="path69-0-9-6-6-4-4-7"
         sodipodi:nodetypes="cssc" />
      <path
         style="fill:none;stroke:#272398;stroke-width:0.2;stroke-dasharray:none;stroke-opacity:1"
         d="m -65.955113,-121.36479 c -0.698381,-0.17562 -1.6606,0.10549 -2.020978,0.68492 -0.320094,0.51465 -0.119112,3.99422 -0.35053,4.59375 -0.231408,0.59952 -0.519581,1.49161 -0.828591,1.95483"
         id="path70-0-7-5-4-0-8-5"
         sodipodi:nodetypes="cssc" />
      <path
         style="fill:none;stroke:#272398;stroke-width:0.2;stroke-dasharray:none;stroke-opacity:1"
         d="m -67.962735,-120.34638 c -0.818922,-0.69659 -2.581203,0.93263 -2.669627,1.42044 -0.08843,0.48791 -0.320294,2.86083 -0.09325,3.82549 0.227024,0.96457 0.0069,1.41482 -0.119177,1.7459"
         id="path71-9-7-4-9-1-0-0"
         sodipodi:nodetypes="cssc" />
      <path
         style="fill:none;stroke:#272398;stroke-width:0.2;stroke-dasharray:none;stroke-opacity:1"
         d="m -70.628,-118.65779 c -0.996941,-0.35965 -2.041285,1.11394 -2.194764,1.64366 -0.153463,0.52983 0.385417,3.46381 0.34251,4.45123"
         id="path72-5-5-1-0-7-4-5"
         sodipodi:nodetypes="csc" />
      <path
         style="fill:none;stroke:#272398;stroke-width:0.2;stroke-dasharray:none;stroke-opacity:1"
         d="m -72.911655,-116.77424 c -0.855892,-0.42461 -1.934702,1.17317 -1.891514,1.73629 0.04322,0.56311 0.666695,3.1026 0.932089,3.88749"
         id="path73-3-7-7-9-9-9-7"
         sodipodi:nodetypes="csc" />
      <path
         style="fill:none;stroke:#272398;stroke-width:0.2;stroke-dasharray:none;stroke-opacity:1"
         d="m -74.898931,-115.01515 c -0.879737,-0.22663 -1.80192,1.31111 -1.857076,1.763 -0.05513,0.45199 0.522201,1.86574 0.759823,2.63909 0.237575,0.77358 0.548576,0.45275 0.635252,0.80579"
         id="path74-4-3-2-1-2-9-7"
         sodipodi:nodetypes="cssc" />
      <path
         style="fill:none;stroke:#272398;stroke-width:0.2;stroke-dasharray:none;stroke-opacity:1"
         d="m -76.830772,-112.97712 c -0.81593,-0.18047 -1.409135,1.21435 -1.230785,1.70089 0.178378,0.48653 0.74357,1.93192 0.807513,2.28101 0.06352,0.34908 0.046,1.96607 0.046,1.96607"
         id="path75-5-3-2-7-8-2-7"
         sodipodi:nodetypes="cscc" />
      <path
         style="fill:none;stroke:#272398;stroke-width:0.2;stroke-dasharray:none;stroke-opacity:1"
         d="m -78.139562,-111.39143 c -0.835599,-0.01 -1.130543,1.47712 -0.856321,1.91684 0.274232,0.43971 1.123477,1.73861 1.257574,2.0673"
         id="path75-5-3-2-7-8-2-7-7"
         sodipodi:nodetypes="csc" />
      <path
         style="fill:none;stroke:#272398;stroke-width:0.2;stroke-dasharray:none;stroke-opacity:1"
         d="m -79.249941,-109.78952 c -0.759604,0.3483 -0.391168,1.81855 0.04465,2.09908 0.43574,0.28034 1.758507,1.09205 2.020123,1.33191"
         id="path75-5-3-2-7-8-2-7-7-5"
         sodipodi:nodetypes="csc" />
      <path
         style="fill:#ffffff;fill-opacity:1;stroke:#272398;stroke-width:0.2;stroke-dasharray:none;stroke-opacity:1"
         d="m -105.77323,-105.30216 c 0.7731,-0.0102 14.451003,3.21482 15.300303,3.10563 4.1684,-1.50859 9.4525,-3.16777 13.4897,-0.53484 3.031,-3.12038 8.6873,-1.83233 10.0542,0.99476 0.6476,1.33944 0.3562,2.339187 0.9337,3.537567 0.6254,1.29767 1.6137,2.22833 1.2312,3.75959 -0.6211,-0.43533 -1.2417,-1.18176 -1.9903,-1.37623 -0.8207,-0.2132 -2.2765,0.67771 -5.3397,0.87037 -0.6821,0.71761 -7.8919,3.8953 -15.5196,0.55269 l -0.1086,-0.13581 c -0.3678,-0.097 -3.6709,-1.54488 -4.2784,-1.79901 -0.6075,-0.25413 -3.5656,0.46361 -4.63469,0.43835 -8.081733,0.11442 -9.713843,-9.405467 -9.137813,-9.413067 z m 10.505603,9.077347 0.2336,-1.09083 c -1.8961,-1.65825 -1.439,-2.33628 -0.8154,-3.171747 0.6235,-0.83548 4.3795,-1.27319 5.2627,-1.51248 0,0 -3.6912,2.045237 -2.492,2.766767 2.4243,-1.748727 10.2575,-3.975367 11.3391,-2.758467 1.6163,1.81834 1.6678,7.466817 -1.4356,7.072197 -3.1034,-0.39462 -9.7487,-2.49151 -7.6425,-3.50514 2.1062,-1.01363 7.859,-2.781007 8.0121,-0.85115 0.1978,2.49152 -3.8857,1.35407 -3.8857,1.35407"
         id="path195-2-1"
         sodipodi:nodetypes="sccsscscccscscccccssssc" />
      <path
         style="fill:none;stroke:#272398;stroke-width:0.2;stroke-dasharray:none;stroke-opacity:1"
         d="m -79.637962,-108.0702 c -0.686887,0.47592 -0.06683,1.85894 0.411309,2.05883 0.478096,0.19979 1.922498,0.7674 2.222056,0.9578"
         id="path75-5-3-2-7-8-2-7-7-0"
         sodipodi:nodetypes="csc" />
      <path
         style="fill:none;stroke:#272398;stroke-width:0.2;stroke-dasharray:none;stroke-opacity:1"
         d="m -79.968459,-106.68788 c -0.610259,0.57088 0.204576,1.84882 0.706726,1.97696 0.502085,0.12805 2.013761,0.47925 2.337846,0.624"
         id="path75-5-3-2-7-8-2-7-7-0-5"
         sodipodi:nodetypes="csc" />
      <path
         style="fill:#a7b5ca;fill-opacity:1;stroke:#272398;stroke-width:0.2;stroke-dasharray:none;stroke-opacity:1"
         d="m -53.16216,-119.33445 c -0.151691,-0.66304 0.839103,-2.00558 -0.02565,-2.10729 -0.835134,-0.0983 -3.212351,0.13476 -3.499618,0.21415 -0.286365,0.083 -2.120122,0.51204 -2.386091,0.66133 -0.265979,0.14929 -2.506096,0.80318 -2.981096,1.24883 -0.474989,0.44564 -1.839491,1.09314 -2.159418,1.1908 -0.319895,0.0979 -0.907946,0.7077 -1.477448,1.026 -0.569491,0.31831 -2.133198,0.88549 -2.68198,0.89667 l -2.223582,1.02721 c -0.791427,0.60587 -1.756649,1.41953 -2.266316,1.64605 -0.509581,0.22682 -1.500126,1.28287 -1.781248,1.55425 -0.281148,0.27128 -1.087048,1.34563 -1.290055,1.64644 -0.202997,0.3008 -1.243253,5.84139 -2.647028,5.31527 -0.699033,-0.26199 2.425705,0.35308 4.986907,0.22929 l 3.722148,0.33062 c 1.446441,-4.44076 2.394623,-5.59453 7.116465,-8.60984 2.018006,-1.28867 6.865902,-3.32949 10.463496,-4.23316 z"
         id="path77-9-5-3-8-0-2-1"
         sodipodi:nodetypes="cscssssccssssccscc" />
      <path
         style="fill:none;stroke:#272398;stroke-width:0.2;stroke-dasharray:none;stroke-opacity:1"
         d="m -65.423282,-111.51829 c 1.36276,-1.03053 3.64051,-2.13125 3.985831,-2.73897 0.345321,-0.60771 1.18647,-1.54019 0.806124,-1.51407 -0.380214,0.0267 -1.333844,0.12458 -1.522407,0.33974 -0.188599,0.21484 -0.515022,1.21405 -1.180355,1.54504"
         id="path79-0-3-6-6-7-5-7" />
      <path
         style="fill:none;stroke:#272398;stroke-width:0.2;stroke-dasharray:none;stroke-opacity:1"
         d="m -63.329101,-114.94288 c -0.801664,0.3216 -0.844797,0.60634 -1.396835,1.05492"
         id="path80-7-7-0-7-1-3-4" />
      <path
         style="fill:none;stroke:#272398;stroke-width:0.2;stroke-dasharray:none;stroke-opacity:1"
         d="m -67.203948,-112.71277 c -1.892702,0.97872 -1.939784,1.08285 -2.120903,1.26957"
         id="path81-6-7-5-0-3-7-9" />
      <path
         style="fill:none;stroke:#272398;stroke-width:0.2;stroke-dasharray:none;stroke-opacity:1"
         d="m -70.010938,-110.83205 c -0.513237,0.38172 -0.699393,0.38214 -1.094061,0.8686"
         id="path82-3-7-7-6-7-6-5" />
      <path
         style="fill:none;stroke:#272398;stroke-width:0.2;stroke-dasharray:none;stroke-opacity:1"
         d="m -71.870006,-109.23885 c -0.805699,0.74149 -1.363795,1.29226 -1.717175,1.76488"
         id="path83-0-0-4-4-8-5-7" />
      <path
         style="fill:none;stroke:#272398;stroke-width:0.2;stroke-dasharray:none;stroke-opacity:1"
         d="m -73.966917,-107.12415 c -0.463095,0.54725 -2.303418,2.97186 -2.912065,4.3436"
         id="path84-0-9-0-1-2-4-8" />
      <path
         style="fill:none;stroke:#272398;stroke-width:0.2;stroke-dasharray:none;stroke-opacity:1"
         d="m -96.1538,-96.15665 c -0.7702,-0.22984 -1.4844,-0.76853 -1.4645,-1.20667 0.02,-0.43814 1.7758,-0.13288 2.1868,-0.51715"
         id="path55-3-0-7-0-8-5" />
      <path
         style="fill:#a7b5ca;fill-opacity:1;stroke:#272398;stroke-width:0.2;stroke-dasharray:none;stroke-opacity:1"
         d="m -97.515,-97.47741 c -0.6081,0.0241 -2.9135,-0.85706 -2.4718,-1.53509 0.5493,-0.71497 3.2418,0.2411 3.9545,-0.34712"
         id="path56-7-0-3-2-9-3"
         sodipodi:nodetypes="ccc" />
      <path
         style="fill:none;stroke:#272398;stroke-width:0.2;stroke-dasharray:none;stroke-opacity:1"
         d="m -99.9445,-99.0671 c -0.7054,-0.23616 -2.967,-1.26209 -2.9952,-2.40229 -0.079,-0.85706 4.3492,1.41121 7.336,0.9503"
         id="path57-3-9-4-6-0-7"
         sodipodi:nodetypes="ccc" />
      <path
         style="fill:#ffffff;fill-opacity:1;stroke:#272398;stroke-width:0.2;stroke-dasharray:none;stroke-opacity:1"
         d="m -89.662859,-102.3527 c -2.03761,-1.90094 -4.1405,-3.61363 -5.248042,-4.30035 -2.122915,-1.31639 -8.115919,-2.90183 -9.832549,-4.01047 -1.71664,-1.10853 -10.33663,-4.82296 -12.16418,-5.72183 -1.82757,-0.89897 -26.04743,-6.67728 -27.34434,-6.87598 10.70923,-4.92121 51.517875,-2.76513 62.210597,18.95565 z"
         id="path76-9-59-7-8-0-2"
         sodipodi:nodetypes="ccccccc" />
      <path
         style="fill:#a7b5ca;fill-opacity:1;stroke:#272398;stroke-width:0.2;stroke-dasharray:none;stroke-opacity:1"
         d="m -102.855,-101.57478 c -0.3866,-0.0965 -2.4281,-1.48049 -2.2856,-2.69815 0.1425,-1.21766 5.1813,2.95036 10.3774,3.09638"
         id="path58-2-8-5-9-1-4"
         sodipodi:nodetypes="csc" />
      <path
         style="fill:none;stroke:#272398;stroke-width:0.2;stroke-dasharray:none;stroke-opacity:1"
         d="m -100.7682,-104.52123 c 1.5849,0.76091 4.7405,2.19076 7.2408,2.92252"
         id="path60-3-1-6-0-4-6"
         sodipodi:nodetypes="cc" />
      <path
         style="fill:#a7b5ca;fill-opacity:1;stroke:#272398;stroke-width:0.2;stroke-dasharray:none;stroke-opacity:1"
         d="m -76.0136,-104.16044 c -0.8959,0.37492 -2.5752,2.01589 -2.5269,2.87523 0.038,0.6776 1.0228,0.65315 1.116,1.20605 0.093,0.55292 -2.2175,-0.66645 -2.0716,1.92499 0.1731,3.07594 2.2618,-0.29256 2.3627,1.08583 0.1009,1.37834 -0.9779,0.75156 -0.8588,1.9425 0.1622,1.62238 2.847,1.90451 3.1908,1.70971 -0.2511,-1.49116 -1.3454,-3.65768 -1.4865,-5.28099 z"
         id="path87-5-7-8-3-9"
         sodipodi:nodetypes="csssssccc" />
      <path
         style="fill:#ffffff;fill-opacity:1;stroke:#272398;stroke-width:0.2;stroke-dasharray:none;stroke-opacity:1"
         d="m -64.9153,-95.13526 c -0.5971,-0.52617 -4.3431,-1.24614 -4.6475,-0.94759 -0.7091,0.69534 -0.578,-0.82533 -0.2546,-1.46321 1.1035,0.11703 4.9021,2.4108 4.9021,2.4108 z"
         id="path88-6-5-8-8-6"
         sodipodi:nodetypes="cscc" />
      <path
         style="fill:#a7b5ca;fill-opacity:1;stroke:#272398;stroke-width:0.2;stroke-dasharray:none;stroke-opacity:1"
         d="m -68.4187,-101.9192 c -1.1433,-0.63062 -2.8627,-0.97494 -2.91,-0.72735 -0.047,0.24762 1.8741,0.56485 2.0503,0.82405 0.1762,0.25922 -0.6748,0.47586 -1.0574,0.5726 -0.3825,0.0967 1.5646,0.20504 1.9171,-0.6693 z"
         id="path85-4-4-3-6-9" />
      <path
         style="fill:none;fill-opacity:1;stroke:#272398;stroke-width:0.2;stroke-dasharray:none;stroke-opacity:1"
         d="m -65.6324,-98.5847 c -1.3583,-0.2206 -5.3772,1.18775 -4.7067,1.09877 0.6706,-0.089 3.9706,1.40544 4.3747,1.58727"
         id="path86-7-3-2-4-1"
         sodipodi:nodetypes="csc" />
      <path
         style="fill:none;stroke:#272398;stroke-width:0.2;stroke-dasharray:none;stroke-opacity:1"
         d="m -144.41766,-123.24836 c 1.56055,-0.21042 7.47125,-0.58896 8.21046,-0.45079 0.73923,0.13827 17.19573,4.54177 20.13445,6.53447 0.39078,0.26497 2.98129,2.0934 3.76567,2.2025"
         id="path62-1-3-9-4-9-9"
         sodipodi:nodetypes="ccsc" />
      <path
         style="fill:#a7b5ca;fill-opacity:1;stroke:#272398;stroke-width:0.2;stroke-dasharray:none;stroke-opacity:1"
         d="m -136.4142,-123.89832 c 0.786,-1.09055 4.76397,-0.57663 5.27532,-0.40019 0.51136,0.17654 13.74482,4.98314 16.24841,6.80073 1.16091,0.84273 3.50098,2.17376 4.02076,2.25973"
         id="path63-1-5-8-2-7-6"
         sodipodi:nodetypes="cssc" />
      <path
         style="fill:none;stroke:#272398;stroke-width:0.2;stroke-dasharray:none;stroke-opacity:1"
         d="m -130.91924,-124.44564 c 0.53581,-0.89162 3.87349,0.14026 4.17751,0.23325 0.30403,0.0932 13.09038,5.95525 13.56792,6.22265 0.47754,0.26741 3.39401,2.55688 3.8736,2.66612"
         id="path64-0-5-7-4-6-8"
         sodipodi:nodetypes="ccsc" />
      <path
         style="fill:none;stroke:#272398;stroke-width:0.2;stroke-dasharray:none;stroke-opacity:1"
         d="m -126.55557,-124.17364 c 0.52533,-0.95814 4.48696,-0.0539 4.9896,0.0653 0.50266,0.1203 9.75618,5.06242 10.97542,6.26109 1.21925,1.19868 3.45652,2.6375 3.6162,2.75297"
         id="path65-5-4-5-0-9-7"
         sodipodi:nodetypes="ccsc" />
      <path
         style="fill:#a7b5ca;fill-opacity:1;stroke:#272398;stroke-width:0.2;stroke-dasharray:none;stroke-opacity:1"
         d="m -120.81932,-123.88303 c 0.67809,-1.16639 4.65553,0.2062 5.23087,0.42672 0.57534,0.22043 7.41307,5.02658 8.1866,6.21709 0.77352,1.19051 2.30519,2.3944 2.58205,2.4091"
         id="path66-6-55-6-4-4-9"
         sodipodi:nodetypes="cssc" />
      <path
         style="fill:none;stroke:#272398;stroke-width:0.2;stroke-dasharray:none;stroke-opacity:1"
         d="m -115.09608,-123.2542 c 0.50934,-0.97563 3.63511,0.37747 4.00915,0.58975 0.37404,0.21237 4.8949,4.26455 5.93121,6.04874 0.44828,0.77175 1.15077,1.75808 1.81786,2.08047"
         id="path67-6-3-5-8-6-8"
         sodipodi:nodetypes="ccsc" />
      <path
         style="fill:none;stroke:#272398;stroke-width:0.2;stroke-dasharray:none;stroke-opacity:1"
         d="m -110.49035,-122.27281 c 0.42927,-1.21754 2.97053,0.37419 3.36251,0.77376 0.392,0.39967 3.23786,4.95491 3.81939,5.68611 0.58154,0.7312 1.60624,1.72136 2.09893,2.31464"
         id="path68-4-8-9-5-4-1"
         sodipodi:nodetypes="cssc" />
      <path
         style="fill:none;stroke:#272398;stroke-width:0.2;stroke-dasharray:none;stroke-opacity:1"
         d="m -106.90888,-121.31961 c 0.4421,-0.82872 2.27074,0.4075 2.6243,0.86371 0.35357,0.45621 1.85355,4.50644 2.3162,5.03237 0.46267,0.52594 1.44451,1.52893 1.55491,2.04161"
         id="path69-0-5-3-7-6-2"
         sodipodi:nodetypes="cssc" />
      <path
         style="fill:none;stroke:#272398;stroke-width:0.2;stroke-dasharray:none;stroke-opacity:1"
         d="m -104.10237,-120.31976 c 0.55708,-0.92064 2.0281,0.11689 2.2576,0.65929 0.22949,0.54231 0.94832,3.75343 1.29951,4.2736 0.3512,0.52007 0.818828,1.30536 1.217532,1.6809"
         id="path70-0-1-2-9-7-2"
         sodipodi:nodetypes="cssc" />
      <path
         style="fill:none;stroke:#272398;stroke-width:0.2;stroke-dasharray:none;stroke-opacity:1"
         d="m -101.78839,-119.34229 c 0.6559,-0.82481 2.718801,0.35901 2.906885,0.80239 0.188096,0.44348 0.909052,2.64077 0.887897,3.59905 -0.02116,0.95829 0.287862,1.33954 0.480153,1.62711"
         id="path71-9-5-3-1-3-1"
         sodipodi:nodetypes="cssc" />
      <path
         style="fill:none;stroke:#272398;stroke-width:0.2;stroke-dasharray:none;stroke-opacity:1"
         d="m -98.829933,-118.28544 c 0.900175,-0.54214 2.22849,0.63984 2.488926,1.10974 0.260437,0.47 0.344404,3.35402 0.592006,4.27925"
         id="path72-5-8-0-1-3-4"
         sodipodi:nodetypes="csc" />
      <path
         style="fill:none;stroke:#272398;stroke-width:0.2;stroke-dasharray:none;stroke-opacity:1"
         d="m -96.204112,-116.96678 c 0.748686,-0.57504 2.136589,0.71742 2.211618,1.25878 0.07498,0.54137 -0.0059,3.06938 -0.101984,3.86546"
         id="path73-3-77-3-5-4-7"
         sodipodi:nodetypes="csc" />
      <path
         style="fill:none;stroke:#272398;stroke-width:0.2;stroke-dasharray:none;stroke-opacity:1"
         d="m -93.894085,-115.70588 c 0.813242,-0.39255 2.035435,0.87488 2.183492,1.29113 0.148057,0.41624 -0.122241,1.87028 -0.193506,2.64989 -0.07128,0.7797 -0.442254,0.53936 -0.453498,0.89074"
         id="path74-4-0-2-9-5-4"
         sodipodi:nodetypes="cssc" />
      <path
         style="fill:none;stroke:#272398;stroke-width:0.2;stroke-dasharray:none;stroke-opacity:1"
         d="m -91.580189,-114.16981 c 0.760446,-0.33602 1.631112,0.86293 1.558002,1.35922 -0.07311,0.49629 -0.462382,2.53622 -0.452222,2.87929"
         id="path75-5-4-6-3-1-0"
         sodipodi:nodetypes="csc" />
      <path
         style="fill:none;stroke:#272398;stroke-width:0.2;stroke-dasharray:none;stroke-opacity:1"
         d="m -90.024921,-112.76273 c 0.760445,-0.33602 1.631112,0.86293 1.558001,1.35922 -0.07311,0.49629 -0.462382,2.53622 -0.452221,2.87929"
         id="path75-5-4-6-3-1-0-6"
         sodipodi:nodetypes="csc" />
      <path
         style="fill:none;stroke:#272398;stroke-width:0.2;stroke-dasharray:none;stroke-opacity:1"
         d="m -88.468514,-111.26585 c 0.760445,-0.33603 1.631112,0.86292 1.558001,1.35921 -0.07311,0.49629 -0.462382,2.53622 -0.452221,2.87929"
         id="path75-5-4-6-3-1-0-4"
         sodipodi:nodetypes="csc" />
      <path
         style="fill:none;stroke:#272398;stroke-width:0.2;stroke-dasharray:none;stroke-opacity:1"
         d="m -86.872226,-109.81265 c 0.760445,-0.33603 1.631112,0.86292 1.558001,1.35921 -0.07311,0.49629 -0.462382,2.53622 -0.452221,2.87929"
         id="path75-5-4-6-3-1-0-9"
         sodipodi:nodetypes="csc" />
      <path
         style="fill:none;stroke:#272398;stroke-width:0.2;stroke-dasharray:none;stroke-opacity:1"
         d="m -85.277874,-108.39522 c 0.760446,-0.33602 1.631113,0.86292 1.558002,1.35922 -0.07311,0.49629 -0.462382,2.53621 -0.452221,2.87928"
         id="path75-5-4-6-3-1-0-13"
         sodipodi:nodetypes="csc" />
      <path
         style="fill:none;stroke:#272398;stroke-width:0.2;stroke-dasharray:none;stroke-opacity:1"
         d="m -83.63621,-106.94479 c 0.760445,-0.33602 1.540448,0.85786 1.558001,1.35922 0.04202,1.20181 -1.610466,1.12174 -1.600305,1.46481"
         id="path75-5-4-6-3-1-0-94"
         sodipodi:nodetypes="csc" />
      <path
         style="fill:#a7b5ca;fill-opacity:1;stroke:#272398;stroke-width:0.2;stroke-dasharray:none;stroke-opacity:1"
         d="m -116.13953,-116.0528 c 0.0103,-0.65781 -0.1336,-1.00782 0.23153,-1.17285 0.36513,-0.16492 2.61066,-0.68211 2.90814,-0.6652 0.2975,0.0173 2.18027,0.0543 2.47149,0.1417 0.29123,0.0874 2.61838,0.25181 3.17577,0.577 0.55738,0.32519 2.02679,0.66111 2.36004,0.68864 0.33326,0.0276 1.03542,0.48526 1.65871,0.67096 0.62329,0.1856 2.27081,0.40519 2.80988,0.30455 l 2.388729,0.52086 c 0.900246,0.41264 2.013739,0.98652 2.559404,1.09749 0.545653,0.11088 1.73438,0.90936 2.065854,1.10905 0.331473,0.19959 1.343435,1.05227 1.604635,1.29571 0.261187,0.24335 0.883148,1.55248 1.971046,1.46363 0.443302,-0.0365 6.98494,5.44605 5.870923,5.84286 -1.785707,0.63611 -6.468431,1.13456 -7.072934,1.78885 -3.783915,-5.12498 -7.548199,-5.77902 -14.085647,-8.46864 -1.18087,-0.48578 -10.52314,-5.04733 -10.91757,-5.19461 z"
         id="path77-9-1-4-6-0-6"
         sodipodi:nodetypes="cscssssccssssscsc" />
      <path
         style="fill:none;stroke:#272398;stroke-width:0.2;stroke-dasharray:none;stroke-opacity:1"
         d="m -102.43361,-110.47851 c -1.54748,-0.6985 -4.00449,-1.27796 -4.4688,-1.78266 -0.4643,-0.5048 -1.48119,-1.21626 -1.10376,-1.2686 0.37745,-0.0522 1.33053,-0.1525 1.55975,0.0131 0.22921,0.16494 0.75657,1.0438 1.47623,1.22196"
         id="path79-0-4-4-9-0-1" />
      <path
         style="fill:none;stroke:#272398;stroke-width:0.2;stroke-dasharray:none;stroke-opacity:1"
         d="m -105.19505,-113.29295 c 0.85105,0.14173 0.95255,0.40223 1.58589,0.71466"
         id="path80-7-3-1-7-6-8" />
      <path
         style="fill:none;stroke:#272398;stroke-width:0.2;stroke-dasharray:none;stroke-opacity:1"
         d="m -100.94077,-111.96907 c 2.055012,0.54215 2.122747,0.63107 2.338775,0.77096"
         id="path81-6-5-5-1-9-9" />
      <path
         style="fill:none;stroke:#272398;stroke-width:0.2;stroke-dasharray:none;stroke-opacity:1"
         d="m -97.803683,-110.75912 c 0.581478,0.25702 0.763635,0.21962 1.250953,0.59976"
         id="path82-3-1-5-1-7-1" />
      <path
         style="fill:none;stroke:#272398;stroke-width:0.2;stroke-dasharray:none;stroke-opacity:1"
         d="m -95.653601,-109.62908 c 0.942443,0.53796 1.603003,0.94578 2.047052,1.32115"
         id="path83-0-9-3-1-3-3" />
      <path
         style="fill:none;stroke:#272398;stroke-width:0.2;stroke-dasharray:none;stroke-opacity:1"
         d="m -93.162285,-108.05399 c 0.566897,0.42372 2.871795,2.34384 3.752767,3.51789"
         id="path84-0-6-0-3-0-6" />
      <rect
         style="fill:none;stroke:none;stroke-width:0.2"
         id="rect1-2"
         width="156.64949"
         height="128.91223"
         x="-157.48369"
         y="-168.43678" />
    </g>
    <g
       id="frame1"
       inkscape:label="frame1"
       transform="translate(157.48369,224.52847)"
       style="display:inline;opacity:1">
      <path
         style="fill:#ffffff;fill-opacity:1;stroke:#272398;stroke-width:0.200001;stroke-dasharray:none;stroke-opacity:1"
         d="m -71.150891,-160.82499 c -1.200345,-4.12725 1.877862,-9.84895 2.662077,-11.75964 0.784271,-1.9106 8.148068,-5.05223 9.535811,-6.56294 8.705464,-9.47729 3.814775,-33.71691 3.645947,-35.14187 -1.698745,2.22565 -9.376013,27.01847 -11.084746,28.87396 -1.708734,1.85549 -8.776313,6.71442 -10.292513,8.73596 -1.5162,2.02155 -5.519289,11.47228 -5.374889,12.38919 0.1444,0.91692 0.874422,3.54493 1.283555,3.45107 0.409134,-0.0939 9.624758,0.0143 9.624758,0.0143 z"
         id="path76-9-5-0-8-8-6-3-5"
         sodipodi:nodetypes="cssc" />
      <path
         style="fill:none;stroke:#272398;stroke-width:0.200001;stroke-dasharray:none;stroke-opacity:1"
         d="m -55.419601,-214.4607 c -1.415474,0.69157 -3.366969,11.34499 -3.900297,11.87667 -0.533279,0.53178 -4.021733,11.62526 -5.309554,14.97754 -0.171263,0.44577 -1.475191,2.88563 -2.062743,3.41761"
         id="path62-1-6-3-7-7-3-3-0"
         sodipodi:nodetypes="ccsc" />
      <path
         style="fill:#a7b5ca;fill-opacity:1;stroke:#272398;stroke-width:0.200001;stroke-dasharray:none;stroke-opacity:1"
         d="m -57.812069,-206.93789 c -1.361907,0.17903 -2.717322,3.95728 -2.790263,4.4955 -0.07285,0.53828 -1.739561,14.58163 -1.221345,17.67076 0.240235,1.43239 0.387072,4.14471 0.227224,4.64734"
         id="path63-1-0-3-7-8-5-4-8"
         sodipodi:nodetypes="cssc" />
      <path
         style="fill:none;stroke:#272398;stroke-width:0.200001;stroke-dasharray:none;stroke-opacity:1"
         d="m -55.467127,-214.84214 c -0.838935,-0.55628 -2.567602,3.82434 -2.346926,7.18342 -0.420325,3.32626 -1.357534,11.42468 -1.337709,11.97648 0.01973,0.55162 -1.603963,12.79527 -1.729323,13.27195"
         id="path64-0-7-5-0-2-8-6-3"
         sodipodi:nodetypes="ccsc" />
      <path
         style="fill:none;stroke:#272398;stroke-width:0.200001;stroke-dasharray:none;stroke-opacity:1"
         d="m -57.750996,-203.79857 c 1.116515,0.0973 1.79838,4.11113 1.880637,4.62226 0.08122,0.51155 -1.019612,11.03046 -1.685744,12.63751 -0.666179,1.60695 -1.164523,4.24867 -1.212187,4.44249"
         id="path65-5-8-7-9-8-6-5-9"
         sodipodi:nodetypes="ccsc" />
      <path
         style="fill:none;stroke:#272398;stroke-width:0.200001;stroke-dasharray:none;stroke-opacity:1"
         d="m -66.629658,-184.29583 c -0.985023,-0.55255 -2.796822,2.35543 -2.984587,2.74662 -0.187701,0.39128 -1.599855,6.39502 -1.430307,8.5052 0.07332,0.91277 0.05958,2.15175 -0.307701,2.8012"
         id="path67-6-6-3-4-9-7-4-8"
         sodipodi:nodetypes="ccsc" />
      <path
         style="fill:none;stroke:#272398;stroke-width:0.200001;stroke-dasharray:none;stroke-opacity:1"
         d="m -69.730751,-181.89622 c -1.058136,-0.80488 -2.247595,1.98121 -2.342227,2.54315 -0.09458,0.56202 0.172413,6.06136 0.111848,7.0138 -0.06057,0.95244 -0.339314,2.37478 -0.40575,3.15922"
         id="path68-4-4-9-6-6-1-6-1"
         sodipodi:nodetypes="cssc" />
      <path
         style="fill:none;stroke:#272398;stroke-width:0.200001;stroke-dasharray:none;stroke-opacity:1"
         d="m -71.668056,-180.61825 c -0.844546,-0.46405 -1.648068,1.61871 -1.678169,2.20778 -0.03011,0.58908 1.061753,4.90288 0.981392,5.61275 -0.08037,0.70988 -0.316171,2.11926 -0.112058,2.62089"
         id="path69-0-9-6-6-4-4-7-8"
         sodipodi:nodetypes="cssc" />
      <path
         style="fill:none;stroke:#272398;stroke-width:0.200001;stroke-dasharray:none;stroke-opacity:1"
         d="m -73.533997,-178.82716 c -0.992907,-0.47867 -1.614447,1.23373 -1.491959,1.82743 0.122431,0.59361 1.378177,3.75083 1.386922,4.39346 0.0087,0.64255 0.07377,1.57775 -0.0403,2.12282"
         id="path70-0-7-5-4-0-8-5-3"
         sodipodi:nodetypes="cssc" />
      <path
         style="fill:none;stroke:#272398;stroke-width:0.200001;stroke-dasharray:none;stroke-opacity:1"
         d="m -74.904095,-177.25363 c -1.019587,-0.34122 -2.0476,1.8275 -1.947877,2.31308 0.09977,0.48568 0.769079,2.77411 1.339262,3.5846 0.570184,0.81048 0.533791,1.31033 0.54017,1.66457"
         id="path71-9-7-4-9-1-0-0-8"
         sodipodi:nodetypes="cssc" />
      <path
         style="fill:none;stroke:#272398;stroke-width:0.200001;stroke-dasharray:none;stroke-opacity:1"
         d="m -77.171528,-174.92071 c -1.059143,0.0379 -1.479036,1.79448 -1.424018,2.34325 0.05507,0.54886 1.648654,3.07058 1.976902,4.00291"
         id="path72-5-5-1-0-7-4-5-3"
         sodipodi:nodetypes="csc" />
      <path
         style="fill:none;stroke:#272398;stroke-width:0.200001;stroke-dasharray:none;stroke-opacity:1"
         d="m -78.625765,-172.50898 c -0.952494,-0.075 -1.358087,1.80968 -1.108104,2.31616 0.250025,0.50645 1.775024,2.63054 2.313781,3.25999"
         id="path73-3-7-7-9-9-9-7-6"
         sodipodi:nodetypes="csc" />
      <path
         style="fill:none;stroke:#272398;stroke-width:0.200001;stroke-dasharray:none;stroke-opacity:1"
         d="m -79.769648,-170.16271 c -0.900783,0.11765 -1.183392,1.88828 -1.066127,2.3282 0.117266,0.43992 1.179963,1.53659 1.68866,2.16575 0.508771,0.62923 0.677803,0.21567 0.889768,0.51091"
         id="path74-4-3-2-1-2-9-7-1"
         sodipodi:nodetypes="cssc" />
      <path
         style="fill:none;stroke:#272398;stroke-width:0.200001;stroke-dasharray:none;stroke-opacity:1"
         d="m -80.791498,-167.60159 c -0.824404,0.13664 -0.854994,1.65205 -0.508155,2.03706 0.346839,0.38501 1.410026,1.51557 1.599447,1.81564 0.189077,0.30029 0.775486,1.80728 0.775486,1.80728"
         id="path75-5-3-2-7-8-2-7-2"
         sodipodi:nodetypes="cscc" />
      <path
         style="fill:none;stroke:#272398;stroke-width:0.200001;stroke-dasharray:none;stroke-opacity:1"
         d="m -81.240248,-165.78119 c -0.824403,0.13664 -0.854994,1.65205 -0.508155,2.03706 0.346839,0.38502 1.410026,1.51558 1.599447,1.81564 0.189077,0.30029 0.775486,1.80728 0.775486,1.80728"
         id="path75-5-3-2-7-8-2-7-2-7"
         sodipodi:nodetypes="cscc" />
      <path
         style="fill:#a7b5ca;fill-opacity:1;stroke:#272398;stroke-width:0.200001;stroke-dasharray:none;stroke-opacity:1"
         d="m -59.161742,-178.91057 c 2.139494,-5.73217 -3.454991,-5.60696 -3.85295,-5.54451 -0.397903,0.0625 -2.558331,0.87367 -2.795281,1.05444 -0.236726,0.18111 -1.776752,1.26503 -1.967826,1.50281 -0.191082,0.23779 -2.026143,1.67939 -2.300838,2.26994 -0.274686,0.59054 -1.299506,1.7 -1.559988,1.90986 -0.260434,0.20995 -0.5788,0.99506 -0.988587,1.50275 -0.409843,0.50759 -1.64945,1.61676 -2.154529,1.83167 l -1.68054,1.78192 c -0.508585,0.8572 -1.10102,1.97194 -1.489529,2.37212 -0.388558,0.40008 -0.913855,1.7496 -1.073578,2.1062 -0.15978,0.35652 -0.507237,1.65376 -0.583449,2.00863 -0.07626,0.35479 -0.383284,1.34461 -0.79047,2.35749 -2.445696,6.08353 6.347552,5.9251 9.178061,5.7214 0.08618,-6.25474 -1.57564,-8.28547 3.58972,-14.20297 0.842466,-0.96516 8.227632,-6.32494 8.469784,-6.67175 z"
         id="path77-9-5-3-8-0-2-1-5"
         sodipodi:nodetypes="cscssssccsssscsc" />
      <path
         style="fill:none;stroke:#272398;stroke-width:0.200001;stroke-dasharray:none;stroke-opacity:1"
         d="m -70.297623,-171.13499 c 0.880465,-1.46421 2.583836,-3.33458 2.677815,-4.02716 0.09392,-0.69265 0.5269,-1.87146 0.183717,-1.70544 -0.343134,0.16612 -1.191321,0.61272 -1.285886,0.88296 -0.09496,0.26963 -0.02544,1.31851 -0.519499,1.87358"
         id="path79-0-3-6-6-7-5-7-1" />
      <path
         style="fill:none;stroke:#272398;stroke-width:0.200001;stroke-dasharray:none;stroke-opacity:1"
         d="m -69.630714,-175.09335 c -0.62402,0.59724 -0.557956,0.87751 -0.90299,1.49955"
         id="path80-7-7-0-7-1-3-4-0" />
      <path
         style="fill:none;stroke:#272398;stroke-width:0.200001;stroke-dasharray:none;stroke-opacity:1"
         d="m -72.395205,-171.57976 c -1.391512,1.61369 -1.396403,1.72784 -1.494877,1.96861"
         id="path81-6-7-5-0-3-7-9-3" />
      <path
         style="fill:none;stroke:#272398;stroke-width:0.200001;stroke-dasharray:none;stroke-opacity:1"
         d="m -74.298935,-168.7883 c -0.333987,0.54551 -0.506611,0.61523 -0.691507,1.21377"
         id="path82-3-7-7-6-7-6-5-6" />
      <path
         style="fill:none;stroke:#272398;stroke-width:0.200001;stroke-dasharray:none;stroke-opacity:1"
         d="m -75.430255,-166.617 c -0.471309,0.98831 -0.783903,1.70743 -0.935669,2.2777"
         id="path83-0-0-4-4-8-5-7-8" />
      <path
         style="fill:#ffffff;fill-opacity:1;stroke:#272398;stroke-width:0.2;stroke-dasharray:none;stroke-opacity:1"
         d="m -105.4498,-161.55686 c 0.7731,-0.0102 14.451,3.21482 15.3003,3.10563 4.1684,-1.50859 9.4525,-3.16777 13.4897,-0.53484 3.031,-3.12038 8.6873,-1.83233 10.0542,0.99476 0.6476,1.33944 0.3562,2.33919 0.9337,3.53757 0.6254,1.29767 1.6137,2.22833 1.2312,3.75959 -0.6211,-0.43533 -1.2417,-1.18176 -1.9903,-1.37623 -0.8207,-0.2132 -2.2765,0.67771 -5.3397,0.87037 -0.6821,0.71761 -7.8919,3.8953 -15.5196,0.55269 l -0.1086,-0.13581 c -0.3678,-0.097 -3.6709,-1.54488 -4.2784,-1.79901 -0.6075,-0.25413 -3.5656,0.46361 -4.634689,0.43835 -8.081731,0.11442 -9.713841,-9.40547 -9.137811,-9.41307 z m 10.5056,9.07735 0.2336,-1.09083 c -1.8961,-1.65825 -1.439,-2.33628 -0.8154,-3.17175 0.6235,-0.83548 4.3795,-1.27319 5.2627,-1.51248 0,0 -3.6912,2.04524 -2.492,2.76677 2.4243,-1.74873 10.2575,-3.97537 11.3391,-2.75847 1.6163,1.81834 1.6678,7.46682 -1.4356,7.0722 -3.1034,-0.39462 -9.7487,-2.49151 -7.6425,-3.50514 2.1062,-1.01363 7.859,-2.78101 8.0121,-0.85115 0.1978,2.49152 -3.8857,1.35407 -3.8857,1.35407"
         id="path195"
         sodipodi:nodetypes="sccsscscccscscccccssssc" />
      <path
         style="fill:none;stroke:#272398;stroke-width:0.200001;stroke-dasharray:none;stroke-opacity:1"
         d="m -76.587894,-163.87311 c -0.225754,0.68042 -1.029822,3.6162 -1.083319,5.116"
         id="path84-0-9-0-1-2-4-8-6" />
      <path
         style="fill:none;stroke:#272398;stroke-width:0.2;stroke-dasharray:none;stroke-opacity:1"
         d="m -96.2159,-152.17882 c -0.7702,-0.22984 -1.4844,-0.76853 -1.4645,-1.20667 0.02,-0.43814 1.7758,-0.13288 2.1868,-0.51715"
         id="path55-3-0-7-0-8-5-7" />
      <path
         style="fill:none;stroke:#272398;stroke-width:0.2;stroke-dasharray:none;stroke-opacity:1"
         d="m -100.0066,-155.08927 c -0.7054,-0.23616 -2.967,-1.26209 -2.9952,-2.40229 -0.079,-0.85706 4.3492,1.41121 7.336,0.9503"
         id="path57-3-9-4-6-0-7-2"
         sodipodi:nodetypes="ccc" />
      <path
         style="fill:#a7b5ca;fill-opacity:1;stroke:#272398;stroke-width:0.2;stroke-dasharray:none;stroke-opacity:1"
         d="m -97.5771,-153.49958 c -0.6081,0.0241 -2.9135,-0.85706 -2.4718,-1.53509 0.5493,-0.71497 3.2418,0.2411 3.9545,-0.34712"
         id="path56-7-0-3-2-9-3-5"
         sodipodi:nodetypes="ccc" />
      <path
         style="fill:none;stroke:#272398;stroke-width:0.2;stroke-dasharray:none;stroke-opacity:1"
         d="m -100.8303,-160.5434 c 1.5849,0.76091 4.7405,2.19076 7.2408,2.92252"
         id="path60-3-1-6-0-4-6-5"
         sodipodi:nodetypes="cc" />
      <path
         style="fill:#ffffff;fill-opacity:1;stroke:#272398;stroke-width:0.2;stroke-dasharray:none;stroke-opacity:1"
         d="m -91.050553,-158.13083 c -0.943215,-3.42308 -2.216915,-4.90783 -3.820978,-6.8226 -1.604033,-1.91488 -6.799349,-5.29696 -8.082569,-6.88731 -1.28325,-1.59026 -8.30691,-7.81678 -9.76116,-9.24264 -1.45422,-1.42597 -22.64727,-14.49676 -23.81675,-15.09152 26.86017,0.64489 57.393634,28.44757 53.991334,35.71871 -1.181976,2.52603 -8.509877,2.32536 -8.509877,2.32536 z"
         id="path76-9-59-7-8-0-2-0"
         sodipodi:nodetypes="cccccsc" />
      <path
         style="fill:#a7b5ca;fill-opacity:1;stroke:#272398;stroke-width:0.2;stroke-dasharray:none;stroke-opacity:1"
         d="m -102.9171,-157.59695 c -0.3866,-0.0965 -2.4281,-1.48049 -2.2856,-2.69815 0.1425,-1.21766 5.1813,2.95036 10.3774,3.09638"
         id="path58-2-8-5-9-1-4-9"
         sodipodi:nodetypes="csc" />
      <path
         style="fill:#a7b5ca;fill-opacity:1;stroke:#272398;stroke-width:0.2;stroke-dasharray:none;stroke-opacity:1"
         d="m -76.0757,-160.18261 c -0.8959,0.37492 -2.5752,2.01589 -2.5269,2.87523 0.038,0.6776 1.0228,0.65315 1.116,1.20605 0.093,0.55292 -2.2175,-0.66645 -2.0716,1.92499 0.1731,3.07594 2.2618,-0.29256 2.3627,1.08583 0.1009,1.37834 -0.9779,0.75156 -0.8588,1.9425 0.1622,1.62238 2.847,1.90451 3.1908,1.70971 -0.2511,-1.49116 -1.3454,-3.65768 -1.4865,-5.28099 z"
         id="path87-5-7-8-3-9-4"
         sodipodi:nodetypes="csssssccc" />
      <path
         style="fill:#ffffff;fill-opacity:1;stroke:#272398;stroke-width:0.2;stroke-dasharray:none;stroke-opacity:1"
         d="m -64.9774,-151.15743 c -0.5971,-0.52617 -4.3431,-1.24614 -4.6475,-0.94759 -0.7091,0.69534 -0.578,-0.82533 -0.2546,-1.46321 1.1035,0.11703 4.9021,2.4108 4.9021,2.4108 z"
         id="path88-6-5-8-8-6-4"
         sodipodi:nodetypes="cscc" />
      <path
         style="fill:#a7b5ca;fill-opacity:1;stroke:#272398;stroke-width:0.2;stroke-dasharray:none;stroke-opacity:1"
         d="m -68.4808,-157.94137 c -1.1433,-0.63062 -2.8627,-0.97494 -2.91,-0.72735 -0.047,0.24762 1.8741,0.56485 2.0503,0.82405 0.1762,0.25922 -0.6748,0.47586 -1.0574,0.5726 -0.3825,0.0967 1.5646,0.20504 1.9171,-0.6693 z"
         id="path85-4-4-3-6-9-1" />
      <path
         style="fill:none;fill-opacity:1;stroke:#272398;stroke-width:0.2;stroke-dasharray:none;stroke-opacity:1"
         d="m -65.6945,-154.60687 c -1.3583,-0.2206 -5.3772,1.18775 -4.7067,1.09877 0.6706,-0.089 3.9706,1.40544 4.3747,1.58727"
         id="path86-7-3-2-4-1-6"
         sodipodi:nodetypes="csc" />
      <path
         style="fill:none;stroke:#272398;stroke-width:0.2;stroke-dasharray:none;stroke-opacity:1"
         d="m -136.69344,-196.21445 c 1.54797,0.28875 7.28003,1.77982 7.93881,2.14248 0.65877,0.36276 14.9092,9.69724 17.07628,12.50983 0.28818,0.374 2.17598,2.92156 2.88676,3.27076"
         id="path62-1-3-9-4-9-9-1"
         sodipodi:nodetypes="ccsc" />
      <path
         style="fill:#a7b5ca;fill-opacity:1;stroke:#272398;stroke-width:0.2;stroke-dasharray:none;stroke-opacity:1"
         d="m -128.88886,-194.32594 c 1.08791,-0.78963 4.70498,0.94392 5.13538,1.27159 0.43038,0.32776 11.49362,9.03596 13.30226,11.54602 0.8387,1.16383 2.64438,3.1606 3.11111,3.40498"
         id="path63-1-5-8-2-7-6-0"
         sodipodi:nodetypes="cssc" />
      <path
         style="fill:none;stroke:#272398;stroke-width:0.2;stroke-dasharray:none;stroke-opacity:1"
         d="m -123.49881,-193.12532 c 0.78802,-0.67904 3.63482,1.34595 3.89445,1.52946 0.25957,0.1837 10.56771,9.7543 10.93752,10.15777 0.36981,0.40348 2.42284,3.49097 2.84411,3.74486"
         id="path64-0-5-7-4-6-8-7"
         sodipodi:nodetypes="ccsc" />
      <path
         style="fill:none;stroke:#272398;stroke-width:0.2;stroke-dasharray:none;stroke-opacity:1"
         d="m -119.43969,-191.50078 c 0.7989,-0.74549 4.27825,1.35361 4.7183,1.62419 0.43972,0.27162 7.68068,7.86246 8.46333,9.3826 0.78265,1.52014 2.45696,3.58709 2.57246,3.74675"
         id="path65-5-4-5-0-9-7-7"
         sodipodi:nodetypes="ccsc" />
      <path
         style="fill:#a7b5ca;fill-opacity:1;stroke:#272398;stroke-width:0.2;stroke-dasharray:none;stroke-opacity:1"
         d="m -114.08284,-189.42881 c 1.00919,-0.89545 4.35691,1.65343 4.83429,2.043 0.4774,0.38947 5.46659,7.09482 5.82849,8.46765 0.3619,1.37283 1.43963,2.99575 1.69797,3.0964"
         id="path66-6-55-6-4-4-9-4"
         sodipodi:nodetypes="cssc" />
      <path
         style="fill:none;stroke:#272398;stroke-width:0.2;stroke-dasharray:none;stroke-opacity:1"
         d="m -108.84421,-187.03971 c 0.78918,-0.76711 3.33416,1.49661 3.62294,1.81532 0.28873,0.3188 3.3136,5.58269 3.7392,7.60163 0.18412,0.87331 0.54248,2.02999 1.07509,2.54503"
         id="path67-6-3-5-8-6-8-9"
         sodipodi:nodetypes="ccsc" />
      <path
         style="fill:none;stroke:#272398;stroke-width:0.2;stroke-dasharray:none;stroke-opacity:1"
         d="m -104.77731,-184.66565 c 0.78888,-1.02193 2.70403,1.28542 2.9512,1.78762 0.24716,0.50231 1.52374,5.71954 1.847098,6.59605 0.323368,0.87651 0.986547,2.13771 1.268718,2.85542"
         id="path68-4-8-9-5-4-1-7"
         sodipodi:nodetypes="cssc" />
      <path
         style="fill:none;stroke:#272398;stroke-width:0.2;stroke-dasharray:none;stroke-opacity:1"
         d="m -101.67434,-182.63905 c 0.39452,-0.37673 1.19344,-0.38033 1.682252,0.15395 0.352906,0.3857 0.458792,1.25988 0.539686,1.48797 0.192949,0.54398 0.349438,4.8602 0.624167,5.50454 0.274738,0.64436 0.893195,1.90432 0.837526,2.42579"
         id="path69-0-5-3-7-6-2-8"
         sodipodi:nodetypes="csssc" />
      <path
         style="fill:none;stroke:#272398;stroke-width:0.2;stroke-dasharray:none;stroke-opacity:1"
         d="m -99.321976,-180.81079 c 0.426716,-0.36543 0.960074,-0.48697 1.34374,-0.1102 0.351195,0.34488 0.570944,1.16263 0.593936,1.44318 0.04814,0.58688 -0.274517,3.86163 -0.103839,4.4656 0.170707,0.60388 0.368961,1.4961 0.630044,1.97759"
         id="path70-0-1-2-9-7-2-5"
         sodipodi:nodetypes="csssc" />
      <path
         style="fill:none;stroke:#272398;stroke-width:0.2;stroke-dasharray:none;stroke-opacity:1"
         d="m -97.430371,-179.15798 c 0.976385,-0.76544 2.68161,0.77513 2.50952,1.67217 -0.09082,0.47305 0.03655,2.79262 -0.283574,3.6961 -0.320119,0.90348 -0.146005,1.36231 -0.05342,1.69563"
         id="path71-9-5-3-1-3-1-4"
         sodipodi:nodetypes="cssc" />
      <path
         style="fill:none;stroke:#272398;stroke-width:0.2;stroke-dasharray:none;stroke-opacity:1"
         d="m -94.951541,-177.228 c 1.230372,-0.64961 2.106586,0.91971 2.01634,1.83321 -0.05282,0.5347 -0.723021,3.29322 -0.777548,4.24945"
         id="path72-5-8-0-1-3-4-4"
         sodipodi:nodetypes="csc" />
      <path
         style="fill:none;stroke:#272398;stroke-width:0.2;stroke-dasharray:none;stroke-opacity:1"
         d="m -92.870598,-175.15352 c 1.290765,-1.19463 1.913468,1.10972 1.706313,1.88794 -0.140567,0.52813 -0.966622,2.9132 -1.307094,3.63918"
         id="path73-3-77-3-5-4-7-5"
         sodipodi:nodetypes="csc" />
      <path
         style="fill:none;stroke:#272398;stroke-width:0.2;stroke-dasharray:none;stroke-opacity:1"
         d="m -91.071486,-173.23276 c 1.474693,-0.95767 1.848449,1.19399 1.669474,1.90984 -0.107124,0.42857 -0.701662,1.73798 -1.013431,2.45608 -0.311819,0.71819 -0.588889,0.37378 -0.709581,0.70398"
         id="path74-4-0-2-9-5-4-1"
         sodipodi:nodetypes="cssc" />
      <path
         style="fill:none;stroke:#272398;stroke-width:0.2;stroke-dasharray:none;stroke-opacity:1"
         d="m -89.354855,-171.04946 c 1.508332,-1.34601 1.659319,0.62357 1.054114,1.77868 -0.232851,0.44429 -0.898073,1.93377 -1.274505,2.47682"
         id="path75-5-4-6-3-1-0-1"
         sodipodi:nodetypes="csc" />
      <path
         style="fill:none;stroke:#272398;stroke-width:0.2;stroke-dasharray:none;stroke-opacity:1"
         d="m -88.116042,-169.48526 c 1.508331,-1.34601 1.659318,0.62357 1.054113,1.77867 -0.232851,0.4443 -0.898073,1.93378 -1.274505,2.47683"
         id="path75-5-4-6-3-1-0-1-8"
         sodipodi:nodetypes="csc" />
      <path
         style="fill:none;stroke:#272398;stroke-width:0.2;stroke-dasharray:none;stroke-opacity:1"
         d="m -86.878584,-168.17233 c 1.508331,-1.34601 1.659319,0.62357 1.054113,1.77867 -0.232851,0.4443 -0.898073,1.93378 -1.274505,2.47683"
         id="path75-5-4-6-3-1-0-1-1"
         sodipodi:nodetypes="csc" />
      <path
         style="fill:none;stroke:#272398;stroke-width:0.2;stroke-dasharray:none;stroke-opacity:1"
         d="m -85.745912,-166.32954 c 1.508331,-1.34601 1.659319,0.62356 1.054113,1.77867 -0.232851,0.4443 -0.898073,1.93377 -1.274505,2.47683"
         id="path75-5-4-6-3-1-0-1-17"
         sodipodi:nodetypes="csc" />
      <path
         style="fill:none;stroke:#272398;stroke-width:0.2;stroke-dasharray:none;stroke-opacity:1"
         d="m -84.599,-164.68434 c 1.508332,-1.34601 1.659319,0.62357 1.054114,1.77867 -0.232852,0.4443 -0.898073,1.93378 -1.274505,2.47683"
         id="path75-5-4-6-3-1-0-1-86"
         sodipodi:nodetypes="csc" />
      <path
         style="fill:none;stroke:#272398;stroke-width:0.2;stroke-dasharray:none;stroke-opacity:1"
         d="m -83.484557,-162.9489 c 1.508332,-1.34601 1.659319,0.62357 1.054113,1.77868 -0.232851,0.44429 -0.03233,0.3856 -0.408803,0.92864"
         id="path75-5-4-6-3-1-0-1-0"
         sodipodi:nodetypes="csc" />
      <path
         style="fill:#a7b5ca;fill-opacity:1;stroke:#272398;stroke-width:0.2;stroke-dasharray:none;stroke-opacity:1"
         d="m -112.08989,-180.52706 c 0.21575,-0.62152 0.18866,-0.99899 0.58709,-1.0414 0.39841,-0.0423 2.69297,0.16956 2.97021,0.27875 0.27712,0.10958 2.05366,0.73416 2.30286,0.90838 0.24921,0.17422 2.4079,1.05894 2.83545,1.54229 0.42755,0.48335 1.7179,1.26244 2.02578,1.39292 0.30786,0.13057 0.83143,0.78504 1.36525,1.15655 0.533838,0.37142 2.029771,1.09579 2.57325,1.16899 l 2.105559,1.24256 c 0.725792,0.67375 1.603624,1.5674 2.087111,1.84364 0.483506,0.27613 1.36247,1.40665 1.614759,1.70008 0.252317,0.29334 0.946436,1.41998 1.118284,1.73297 0.171867,0.31288 0.352682,1.75092 1.413701,2.00715 0.499964,0.12079 5.649033,5.78645 4.267282,6.23686 -1.755283,0.5722 -4.917261,1.24302 -6.067701,1.96721 -1.903795,-6.26327 -6.541807,-9.61257 -12.456595,-13.78533 -1.0434,-0.73607 -8.41381,-8.08826 -8.74229,-8.35162 z"
         id="path77-9-1-4-6-0-6-4"
         sodipodi:nodetypes="cscssssccssssscsc" />
      <path
         style="fill:none;stroke:#272398;stroke-width:0.2;stroke-dasharray:none;stroke-opacity:1"
         d="m -100.81831,-170.94185 c -1.25098,-1.14788 -3.40305,-2.46747 -3.68599,-3.09217 -0.28291,-0.62479 -1.02593,-1.61886 -0.65108,-1.55039 0.37483,0.0686 1.31138,0.27174 1.47722,0.50082 0.16604,0.22841 0.39172,1.2282 1.01942,1.62271"
         id="path79-0-4-4-9-0-1-9" />
      <path
         style="fill:none;stroke:#272398;stroke-width:0.2;stroke-dasharray:none;stroke-opacity:1"
         d="m -102.55974,-174.47937 c 0.76389,0.40106 0.77872,0.68025 1.2824,1.17526"
         id="path80-7-3-1-7-6-8-6" />
      <path
         style="fill:none;stroke:#272398;stroke-width:0.2;stroke-dasharray:none;stroke-opacity:1"
         d="m -98.933843,-171.89007 c 1.781947,1.15829 1.818437,1.26395 1.979806,1.46444"
         id="path81-6-5-5-1-9-9-9" />
      <path
         style="fill:none;stroke:#272398;stroke-width:0.2;stroke-dasharray:none;stroke-opacity:1"
         d="m -96.333306,-169.75876 c 0.471775,0.42615 0.656482,0.44766 1.000282,0.96126"
         id="path82-3-1-5-1-7-1-8" />
      <path
         style="fill:none;stroke:#272398;stroke-width:0.2;stroke-dasharray:none;stroke-opacity:1"
         d="m -94.645127,-168.01237 c 0.726633,0.80598 1.226296,1.40012 1.530496,1.89564"
         id="path83-0-9-3-1-3-3-0" />
      <path
         style="fill:none;stroke:#272398;stroke-width:0.2;stroke-dasharray:none;stroke-opacity:1"
         d="m -92.772209,-165.73646 c 0.405732,0.5799 1.993578,3.12513 2.462675,4.51597"
         id="path84-0-6-0-3-0-6-8" />
      <rect
         style="fill:none;stroke:none;stroke-width:0.2"
         id="rect1"
         width="156.64949"
         height="128.91223"
         x="-157.48369"
         y="-224.52847" />
    </g>
  </g>
</svg>










`;

export default Bird;