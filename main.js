//フォームの表示
let result = document.getElementById("result");
//計算済みかどうか
let is_calculated = false;
//小数点が含まれているかどうか
let included_decimal_point = false;
//配列に演算子を代入
let operator = ["+","-","*","/"];

//ACキー押下
function ac_click(){
  result.value = "0"; //フォームの値を0にする
  is_calculated = false; //未計算の状態にする
  included_decimal_point = false; //小数点が含まれていない状態にする
}

//数字キー(1~9)押下
function num_click(num){
  //計算済みの場合
  if(is_calculated){
    result.value = "0"; //フォームの値を0にする
    is_calculated = false; //未計算の状態にする
  }
  
  //フォームの値が0の場合
  if(result.value == "0"){
    //0キーもしくは00キーを押した場合
    if(num == "0" || num == "00"){
      result.value = "0"; //フォーム値を0にする
    //それ以外の場合
    }else{
      result.value = num; //フォーム値を押した数字キーの値にする
    }
  //フォームの末尾が演算子の状態で、00キーを押した場合
  }else if(check_ope_last() && num == "00"){
    //値に00を追加しない
  //フォーム値の後ろから二番目が演算子で、末尾が0で、小数点を含んでいない場合
  }else if(chechk_ope_second_last() && result.value.slice(-1) == "0" && !included_decimal_point){
    //0もしくは00キーを押した場合
    if(num == "0" || num == "00"){
      //値に00もしくは0を追加しない
    //それ以外の場合
    }else{
      result.value = result.value.slice(0,-1) + num; //フォームの末尾を削除して、押した演算子キーの値を追加
    }
  //それ以外の場合
  }else{
    result.value += num; //フォームの値に、押した数字キーの値を追加
  }
}

//小数点キー押下
function point_click(point){
  //計算済みの場合
  if(is_calculated){
    result.value = "0"; //フォームの表示を0にする
    is_calculated = false; //未計算の状態にする
  }
  //フォームの末尾が小数点の場合
  if(result.value.slice(-1) == "."){
    result.value = result.value.slice(0,-1) + point; //フィームの末尾を削除して、小数点を追加
    included_decimal_point = true; //小数点が含まれている状態にする
  //小数点が含まれている状態、もしくはフォームの末尾が演算子の場合
  }else if(included_decimal_point || check_ope_last()){
    //小数点を追加しない
  //それ以外の場合
  }else{
    result.value += point; //フォームの値に、小数点を追加
    included_decimal_point = true; //小数点が含まれている状態にする
  }
}

//演算子キー押下
function ope_click(ope){
  //小数点が含まれていない状態にする
  included_decimal_point = false;
  //計算済みの場合
  if(is_calculated){
    is_calculated = false; //未計算の状態にする
  }
  //フォームの末尾が演算子キーの場合
  if(check_ope_last()){
    result.value = result.value.slice(0,-1) + ope; //フォームの末尾を削除して、押した演算子キーの値を追加
  //フォームの末尾が小数点の場合
  }else if(result.value.slice(-1) == "."){
    result.value = result.value.slice(0,-1) + ope; //フォームの末尾を削除して、押した演算子キーの値を追加
  //それ以外の場合
  }else{
    result.value += ope; //フォームの表示に押した演算子キーの値を追加
  }
}

//イコールキー押下
function equal_click(){
  //小数点が含まれていない状態にする
  included_decimal_point = false;
  //計算済みの状態にする
  is_calculated = true;
  //フォームの末尾が演算子キーの場合
  if(check_ope_last()){
    result.value = result.value.slice(0,-1); //フォームの末尾を削除
  }
  //フォームに入力されている値を計算し、変数calculation_resultに代入
  let calculation_result = new Function("return " + result.value)();
  //計算結果が無限大もしくはNaNの場合
  if(calculation_result == Infinity || Number.isNaN(calculation_result)){
    result.value = "ERROR"; //フォームの表示をERRORにする
  //それ以外の場合
  }else{
    result.value = calculation_result; //フォームに計算結果を表示
  }
}

//フォームの末尾が演算子かどうか
function check_ope_last(){
  return operator.includes(result.value.slice(-1)); //演算子にフォームの末尾が含まれているかどうかチェックして、その結果（真偽値）を戻り値とする
}

//フォーム値の後ろから二番目が演算子かどうか
function chechk_ope_second_last(){
  return operator.includes(result.value.slice(-2,-1)); //演算子にフォームの後ろから二番目の値が含まれているかどうかチェックして、その結果を戻り値とする
}