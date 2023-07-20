// import useClipboard from "vue-clipboard3";
import { AppConfig } from "@/utils/config";
// 设置rem
const setRem = (baseSize: any, value: any) => {
  // 当前页面宽度相对于 750 宽的缩放比例，可根据自己需要修改。
  const scale = document.documentElement.clientWidth / 750;
  // 设置页面根节点字体大小
  return baseSize * Math.min(scale, 2) + "" + value;
};

// base64 转 File文件流
// const convertFile = (urlData: any, filename: any) => {
//   if (typeof urlData !== "string") {
//     return;
//   }
//   const arr = urlData.split(",");
//   const type = arr[0].match(/:(.*?);/)[1] as any;
//   const fileExt = type.split("/")[1];
//   const bstr = atob(arr[1]);
//   let n = bstr?.length;
//   const u8arr = new Uint8Array(n);
//   while (n--) {
//     u8arr[n] = bstr.charCodeAt(n);
//   }
//   return new File([u8arr], "filename." + fileExt, {
//     type: type,
//   });
// };
const filterLikes = (item: any) => {
  const num = Number.parseInt(item);
  if (num >= 10000) {
    return (num / 10000).toFixed(2) + "w";
  }
  return num;
};

const addRequestPrefix = (item: any) => {
  if (!item) {
    return "";
  }
  let reslut = AppConfig.apiUrl + item;
  if (item.indexOf("http") > -1) {
    reslut = item;
  }
  return reslut;
};

//复制颜色值到剪贴板
const copy = async (item: any) => {
  // const { toClipboard } = useClipboard();
  // try {
  //   await toClipboard(item);
  //   showToast("复制成功");
  // } catch (e) {
  //   showToast("复制失败");
  // }
  // return { copy };
};

const formatSeconds = (value: any) => {
  var theTime = parseInt(value) as any; // 秒
  var theTime1 = 0; // 分
  var theTime2 = 0; // 小时
  if (theTime > 60) {
    theTime1 = parseInt((theTime / 60) as any);
    theTime = parseInt((theTime % 60) as any);
    if (theTime1 > 60) {
      theTime2 = parseInt((theTime1 / 60) as any);
      theTime1 = parseInt((theTime1 % 60) as any);
    }
  }
  var result = ("" + parseInt(theTime)) as any;
  if (result < 10) {
    result = "0" + result;
  }
  if (theTime1 > 0) {
    result = "" + parseInt(theTime1 as any) + ":" + result;
    if (theTime1 < 10) {
      result = "0" + result;
    }
  } else {
    result = "00:" + result;
  }
  if (theTime2 > 0) {
    result = "" + parseInt(theTime2 as any) + ":" + result;
    if (theTime2 < 10) {
      result = "0" + result;
    }
  } else {
    result = "00:" + result;
  }
  return result;
};

export const baseSetRem = (baseSize: any, value: any) => {
  return setRem(baseSize, value);
};
// export const base64ConvertFile = (urlData: any, filename: any) => {
//   return convertFile(urlData, filename);
// };

export const baseCopy = (item: any) => {
  return copy(item);
};
export const baseFilterLikes = (item: any) => {
  return filterLikes(item);
};
export const baseAddRequestPrefix = (item: any) => {
  return addRequestPrefix(item);
};
export const baseFormatSeconds = (item: any) => {
  return formatSeconds(item);
};
