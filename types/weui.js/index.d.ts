export as namespace weui;
export default weui;

// [options.duration]	number	3000	多少毫秒后关闭toast
// [options.callback]	function		关闭后的回调
// [options.className]	string		自定义类名
interface toast_options {
    duration?: number;
    callback?: Function;
    className?: string;
}

declare namespace weui {

    function loading(content: string, options?: object): any;

    function confirm(content: string): void;
    function confirm(yes: Function, no: Function): void;
    function confirm(content: string, options?: object): void;

    function toast(content: string, options?: toast_options): void;

}