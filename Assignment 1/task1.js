let operation = process.argv[3];
let result = 0;
switch (operation) {
    case "addition":
        for(let x = 4;x<process.argv.length ; x++){
            result = result+Number(process.argv[x])
        }
        console.log(result)
        break;
    case "subtraction":
        result = Number(process.argv[4])
        for(let x = 5;x<process.argv.length ; x++){
            result = result-Number(process.argv[x])
        }
        console.log(result)
        break;
    case "multiply":
        result = 1
        for(let x = 4;x<process.argv.length ; x++){
            result = result*Number(process.argv[x])
        }
        console.log(result)
        break;  
    case "division":
        result = Number(process.argv[4])
        for(let x = 5;x<process.argv.length ; x++){
            result = result/Number(process.argv[x])
        }
        console.log(result)
        break;              
    default:
        console.log("Enter valid arguements")
        break;
}
