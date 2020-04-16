
//----------計算--------
let input_num = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
set_num();

//two=ツーウェイ,line=列,sc=7C,tc=10C,fif=50％以下,ei=80％以上
//mukou=無効貫通,l=L字,oiuti=超追い打ち,hl=回復L字,malth=マルチブースト
let count_num = 0;

let cal = document.getElementById("cal");
cal.addEventListener("click", function(){
    for(let i = 0; i < input_num.length; i++){
        input_num[i] = document.getElementById("count_" + i).value - 0;
    }

    const TWO = 0, HL = 7, FIF = 8, EI = 9, MALTH = 10;
    let kei = 1, fif, ei, malth;

    for(let i = 0; i < input_num.length; i++){
        if(i >= TWO && i <= HL){
            kei *= mag_calcu(i, input_num[i]);
        }
        else{
            switch (i) {
                case FIF:   fif   = mag_calcu(i, input_num[i]); break;
                case EI:    ei    = mag_calcu(i, input_num[i]); break;
                case MALTH: malth = mag_calcu(i, input_num[i]); break;
                default:break;
            }
        }
    }

    let result = document.getElementById("result");

    result.innerHTML = "<br>" + result.innerHTML;

    if(fif == 1 || ei == 1){
		if(malth != 1){
			result.innerHTML = "マルチ時 " + (kei * malth) + "<br>" + result.innerHTML;
        }
        result.innerHTML = "ソロ時 " + kei + "<br>" + result.innerHTML;
    }

    if(ei != 1){
        if(malth != 1){
			result.innerHTML = "HP80%以下時+マルチ時 " + (kei * malth) + "<br>" + result.innerHTML;
            result.innerHTML = "HP80%以上時+マルチ時 " + (kei * malth * ei) + "<br>" + result.innerHTML;
		}
		result.innerHTML = "HP80%以下時 " +  kei + "<br>" + result.innerHTML;
        result.innerHTML = "HP80%以上時 " + (kei * ei) + "<br>" + result.innerHTML;
    }

    if(fif != 1){
        if(malth != 1){
            result.innerHTML = "HP50%以上+マルチ時 " + (kei * malth) + "<br>" + result.innerHTML;
            result.innerHTML = "HP50%以下+マルチ時 " + (kei * malth * fif) + "<br>" + result.innerHTML;
        }
        result.innerHTML = "HP50%以上時 " +  kei + "<br>" + result.innerHTML;
        result.innerHTML = "HP50%以下時 " + (kei * fif) + "<br>" + result.innerHTML;
    }
    result.innerHTML = ">>" + ++count_num + "<br>" + result.innerHTML;
});

function mag_calcu(i, input){
    const mag_index = ["1.5", "1.15", "2", "5", "2.5", "1.5", "2", "1.5", "2", "1.5", "1.5"];
    let r;
    if(input != 0){
        r = mag_index[i];
        for(let x = 1; x < input; x++){
            r *= mag_index[i];
        }
    }
    else{
        r = 1;
    }
    return r;
}

let set = document.getElementById("set");
set.addEventListener("click", function(){
    set_num();
});

function set_num(){
    for(let i = 0; i < input_num.length; i++){
        document.getElementById("count_" + i).options[0].selected = true;
    }
}

