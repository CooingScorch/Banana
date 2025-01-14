
        let button = document.getElementById("button");
        button.addEventListener("click",()=>start());
        let candle = document.getElementById("lit");
        function start(){
            button.style.display = "none";
            let audio = document.getElementById("audio");
            let appear = document.getElementsByClassName("wrapper");
            
            audio.play();
            for (let i=0;i<appear.length;i++)
                appear[i].style.display ="flex";
    
            medaiDevices = navigator.mediaDevices
            medaiDevices.getUserMedia({audio:true}).then(async(stream)=>{
                //create new audio processing object
                const context = new AudioContext();
                //create new audio mediastream object for provisin srouce for manipulation
                const source = context.createMediaStreamSource(stream);

                await context.audioWorklet.addModule("processor.js");
                const processor = new AudioWorkletNode(context, "processor");

                let counter = 0;
                //communictes with the processor function in ther file
                processor.port.onmessage=(event)=>{
                    if (event.data=="banana" && counter >= 0 && counter <=50){
                        counter++;
                        candle.src ="blowF.gif";
                        console.log("blow");
                        setTimeout(revert,1000);
                        
                    }else if (event.data=="nobanana"){
                        setTimeout(out,3000);   
                        processor.port.postMessage("end");
                    }else if(counter>50){
                        processor.port.postMessage("-1");
                    }
                    
                }
                //the input (source) passes to the proccosr unit and the the processor then passes to the context after processed
                source.connect(processor).connect(context.destination);
                
            })

        }
        function revert(){
            candle.src ="lit.gif";
            console.log("default");
        }
        function out(){
            candle.src ="out.gif";
            console.log("out");
            setTimeout(end,2900);
        }
        function end(){
            candle.style.animation="5s ease-out 0s 1 loadIn" ;
            candle.src ="end.png";
            console.log("end");
        }
            