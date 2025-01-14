class Processor extends AudioWorkletProcessor{
    constructor(){
        super();
        this.n=0;
        this.port.onmessage = (e)=>{
            if(e.data=="-1"){
                this.n=-1;
            }
            else if(e.data=="end"){
                this.n=-2;
            }
        }
        
    }

    process(inputs,outputs,parameters){
        const input = inputs[0];
        input.forEach((channel) => {
            for (let i =0; i<channel.length;i++ ){
                if (Math.abs(channel[i])>=0.95 && this.n==0){
                    console.log(channel[i]);
                    this.port.postMessage("banana");
                }else if(this.n==-1){
                    this.port.postMessage("nobanana");
                }
            }
            
        });

        return true;
    }
}

registerProcessor("processor",Processor);