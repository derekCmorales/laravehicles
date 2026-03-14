(globalThis.TURBOPACK || (globalThis.TURBOPACK = [])).push([typeof document === "object" ? document.currentScript : undefined,
"[project]/DEREK-PROJECTS/PERSONAL/platzi/nestjs/laravehicles/frontend/lib/utils.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "cn",
    ()=>cn
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$DEREK$2d$PROJECTS$2f$PERSONAL$2f$platzi$2f$nestjs$2f$laravehicles$2f$frontend$2f$node_modules$2f$clsx$2f$dist$2f$clsx$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/DEREK-PROJECTS/PERSONAL/platzi/nestjs/laravehicles/frontend/node_modules/clsx/dist/clsx.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$DEREK$2d$PROJECTS$2f$PERSONAL$2f$platzi$2f$nestjs$2f$laravehicles$2f$frontend$2f$node_modules$2f$tailwind$2d$merge$2f$dist$2f$bundle$2d$mjs$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/DEREK-PROJECTS/PERSONAL/platzi/nestjs/laravehicles/frontend/node_modules/tailwind-merge/dist/bundle-mjs.mjs [app-client] (ecmascript)");
;
;
function cn(...inputs) {
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$DEREK$2d$PROJECTS$2f$PERSONAL$2f$platzi$2f$nestjs$2f$laravehicles$2f$frontend$2f$node_modules$2f$tailwind$2d$merge$2f$dist$2f$bundle$2d$mjs$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["twMerge"])((0, __TURBOPACK__imported__module__$5b$project$5d2f$DEREK$2d$PROJECTS$2f$PERSONAL$2f$platzi$2f$nestjs$2f$laravehicles$2f$frontend$2f$node_modules$2f$clsx$2f$dist$2f$clsx$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["clsx"])(inputs));
}
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/DEREK-PROJECTS/PERSONAL/platzi/nestjs/laravehicles/frontend/components/ui/toaster.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "Toaster",
    ()=>Toaster,
    "toast",
    ()=>toast,
    "useToast",
    ()=>useToast
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$DEREK$2d$PROJECTS$2f$PERSONAL$2f$platzi$2f$nestjs$2f$laravehicles$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/DEREK-PROJECTS/PERSONAL/platzi/nestjs/laravehicles/frontend/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$DEREK$2d$PROJECTS$2f$PERSONAL$2f$platzi$2f$nestjs$2f$laravehicles$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/DEREK-PROJECTS/PERSONAL/platzi/nestjs/laravehicles/frontend/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$DEREK$2d$PROJECTS$2f$PERSONAL$2f$platzi$2f$nestjs$2f$laravehicles$2f$frontend$2f$node_modules$2f40$radix$2d$ui$2f$react$2d$toast$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/DEREK-PROJECTS/PERSONAL/platzi/nestjs/laravehicles/frontend/node_modules/@radix-ui/react-toast/dist/index.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$DEREK$2d$PROJECTS$2f$PERSONAL$2f$platzi$2f$nestjs$2f$laravehicles$2f$frontend$2f$node_modules$2f$class$2d$variance$2d$authority$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/DEREK-PROJECTS/PERSONAL/platzi/nestjs/laravehicles/frontend/node_modules/class-variance-authority/dist/index.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$DEREK$2d$PROJECTS$2f$PERSONAL$2f$platzi$2f$nestjs$2f$laravehicles$2f$frontend$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$x$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__X$3e$__ = __turbopack_context__.i("[project]/DEREK-PROJECTS/PERSONAL/platzi/nestjs/laravehicles/frontend/node_modules/lucide-react/dist/esm/icons/x.js [app-client] (ecmascript) <export default as X>");
var __TURBOPACK__imported__module__$5b$project$5d2f$DEREK$2d$PROJECTS$2f$PERSONAL$2f$platzi$2f$nestjs$2f$laravehicles$2f$frontend$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/DEREK-PROJECTS/PERSONAL/platzi/nestjs/laravehicles/frontend/lib/utils.ts [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature(), _s1 = __turbopack_context__.k.signature();
"use client";
;
;
;
;
;
const ToastProvider = __TURBOPACK__imported__module__$5b$project$5d2f$DEREK$2d$PROJECTS$2f$PERSONAL$2f$platzi$2f$nestjs$2f$laravehicles$2f$frontend$2f$node_modules$2f40$radix$2d$ui$2f$react$2d$toast$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Provider"];
const ToastViewport = /*#__PURE__*/ __TURBOPACK__imported__module__$5b$project$5d2f$DEREK$2d$PROJECTS$2f$PERSONAL$2f$platzi$2f$nestjs$2f$laravehicles$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["forwardRef"](({ className, ...props }, ref)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$DEREK$2d$PROJECTS$2f$PERSONAL$2f$platzi$2f$nestjs$2f$laravehicles$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$DEREK$2d$PROJECTS$2f$PERSONAL$2f$platzi$2f$nestjs$2f$laravehicles$2f$frontend$2f$node_modules$2f40$radix$2d$ui$2f$react$2d$toast$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Viewport"], {
        ref: ref,
        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$DEREK$2d$PROJECTS$2f$PERSONAL$2f$platzi$2f$nestjs$2f$laravehicles$2f$frontend$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])("fixed top-0 z-[100] flex max-h-screen w-full flex-col-reverse p-4 sm:bottom-0 sm:right-0 sm:top-auto sm:flex-col md:max-w-[420px]", className),
        ...props
    }, void 0, false, {
        fileName: "[project]/DEREK-PROJECTS/PERSONAL/platzi/nestjs/laravehicles/frontend/components/ui/toaster.tsx",
        lineNumber: 15,
        columnNumber: 3
    }, ("TURBOPACK compile-time value", void 0)));
_c = ToastViewport;
ToastViewport.displayName = __TURBOPACK__imported__module__$5b$project$5d2f$DEREK$2d$PROJECTS$2f$PERSONAL$2f$platzi$2f$nestjs$2f$laravehicles$2f$frontend$2f$node_modules$2f40$radix$2d$ui$2f$react$2d$toast$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Viewport"].displayName;
const toastVariants = (0, __TURBOPACK__imported__module__$5b$project$5d2f$DEREK$2d$PROJECTS$2f$PERSONAL$2f$platzi$2f$nestjs$2f$laravehicles$2f$frontend$2f$node_modules$2f$class$2d$variance$2d$authority$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cva"])("group pointer-events-auto relative flex w-full items-center justify-between space-x-4 overflow-hidden rounded-md border p-6 pr-8 shadow-lg transition-all data-[swipe=cancel]:translate-x-0 data-[swipe=end]:translate-x-[var(--radix-toast-swipe-end-x)] data-[swipe=move]:translate-x-[var(--radix-toast-swipe-move-x)] data-[swipe=move]:transition-none data-[state=open]:animate-in data-[state=closed]:animate-out data-[swipe=end]:animate-out data-[state=closed]:fade-out-80 data-[state=closed]:slide-out-to-right-full data-[state=open]:slide-in-from-top-full data-[state=open]:sm:slide-in-from-bottom-full", {
    variants: {
        variant: {
            default: "border bg-background text-foreground",
            destructive: "destructive group border-destructive bg-destructive text-destructive-foreground",
            success: "border-success bg-success text-success-foreground"
        }
    },
    defaultVariants: {
        variant: "default"
    }
});
const Toast = /*#__PURE__*/ __TURBOPACK__imported__module__$5b$project$5d2f$DEREK$2d$PROJECTS$2f$PERSONAL$2f$platzi$2f$nestjs$2f$laravehicles$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["forwardRef"](({ className, variant, ...props }, ref)=>{
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$DEREK$2d$PROJECTS$2f$PERSONAL$2f$platzi$2f$nestjs$2f$laravehicles$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$DEREK$2d$PROJECTS$2f$PERSONAL$2f$platzi$2f$nestjs$2f$laravehicles$2f$frontend$2f$node_modules$2f40$radix$2d$ui$2f$react$2d$toast$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Root"], {
        ref: ref,
        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$DEREK$2d$PROJECTS$2f$PERSONAL$2f$platzi$2f$nestjs$2f$laravehicles$2f$frontend$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])(toastVariants({
            variant
        }), className),
        ...props
    }, void 0, false, {
        fileName: "[project]/DEREK-PROJECTS/PERSONAL/platzi/nestjs/laravehicles/frontend/components/ui/toaster.tsx",
        lineNumber: 50,
        columnNumber: 5
    }, ("TURBOPACK compile-time value", void 0));
});
_c1 = Toast;
Toast.displayName = __TURBOPACK__imported__module__$5b$project$5d2f$DEREK$2d$PROJECTS$2f$PERSONAL$2f$platzi$2f$nestjs$2f$laravehicles$2f$frontend$2f$node_modules$2f40$radix$2d$ui$2f$react$2d$toast$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Root"].displayName;
const ToastAction = /*#__PURE__*/ __TURBOPACK__imported__module__$5b$project$5d2f$DEREK$2d$PROJECTS$2f$PERSONAL$2f$platzi$2f$nestjs$2f$laravehicles$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["forwardRef"](_c2 = ({ className, ...props }, ref)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$DEREK$2d$PROJECTS$2f$PERSONAL$2f$platzi$2f$nestjs$2f$laravehicles$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$DEREK$2d$PROJECTS$2f$PERSONAL$2f$platzi$2f$nestjs$2f$laravehicles$2f$frontend$2f$node_modules$2f40$radix$2d$ui$2f$react$2d$toast$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Action"], {
        ref: ref,
        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$DEREK$2d$PROJECTS$2f$PERSONAL$2f$platzi$2f$nestjs$2f$laravehicles$2f$frontend$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])("inline-flex h-8 shrink-0 items-center justify-center rounded-md border bg-transparent px-3 text-sm font-medium ring-offset-background transition-colors hover:bg-secondary focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 group-[.destructive]:border-muted/40 group-[.destructive]:hover:border-destructive/30 group-[.destructive]:hover:bg-destructive group-[.destructive]:hover:text-destructive-foreground group-[.destructive]:focus:ring-destructive", className),
        ...props
    }, void 0, false, {
        fileName: "[project]/DEREK-PROJECTS/PERSONAL/platzi/nestjs/laravehicles/frontend/components/ui/toaster.tsx",
        lineNumber: 63,
        columnNumber: 3
    }, ("TURBOPACK compile-time value", void 0)));
_c3 = ToastAction;
ToastAction.displayName = __TURBOPACK__imported__module__$5b$project$5d2f$DEREK$2d$PROJECTS$2f$PERSONAL$2f$platzi$2f$nestjs$2f$laravehicles$2f$frontend$2f$node_modules$2f40$radix$2d$ui$2f$react$2d$toast$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Action"].displayName;
const ToastClose = /*#__PURE__*/ __TURBOPACK__imported__module__$5b$project$5d2f$DEREK$2d$PROJECTS$2f$PERSONAL$2f$platzi$2f$nestjs$2f$laravehicles$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["forwardRef"](({ className, ...props }, ref)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$DEREK$2d$PROJECTS$2f$PERSONAL$2f$platzi$2f$nestjs$2f$laravehicles$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$DEREK$2d$PROJECTS$2f$PERSONAL$2f$platzi$2f$nestjs$2f$laravehicles$2f$frontend$2f$node_modules$2f40$radix$2d$ui$2f$react$2d$toast$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Close"], {
        ref: ref,
        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$DEREK$2d$PROJECTS$2f$PERSONAL$2f$platzi$2f$nestjs$2f$laravehicles$2f$frontend$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])("absolute right-2 top-2 rounded-md p-1 text-foreground/50 opacity-0 transition-opacity hover:text-foreground focus:opacity-100 focus:outline-none focus:ring-2 group-hover:opacity-100 group-[.destructive]:text-red-300 group-[.destructive]:hover:text-red-50 group-[.destructive]:focus:ring-red-400 group-[.destructive]:focus:ring-offset-red-600", className),
        "toast-close": "",
        ...props,
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$DEREK$2d$PROJECTS$2f$PERSONAL$2f$platzi$2f$nestjs$2f$laravehicles$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$DEREK$2d$PROJECTS$2f$PERSONAL$2f$platzi$2f$nestjs$2f$laravehicles$2f$frontend$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$x$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__X$3e$__["X"], {
            className: "h-4 w-4"
        }, void 0, false, {
            fileName: "[project]/DEREK-PROJECTS/PERSONAL/platzi/nestjs/laravehicles/frontend/components/ui/toaster.tsx",
            lineNumber: 87,
            columnNumber: 5
        }, ("TURBOPACK compile-time value", void 0))
    }, void 0, false, {
        fileName: "[project]/DEREK-PROJECTS/PERSONAL/platzi/nestjs/laravehicles/frontend/components/ui/toaster.tsx",
        lineNumber: 78,
        columnNumber: 3
    }, ("TURBOPACK compile-time value", void 0)));
_c4 = ToastClose;
ToastClose.displayName = __TURBOPACK__imported__module__$5b$project$5d2f$DEREK$2d$PROJECTS$2f$PERSONAL$2f$platzi$2f$nestjs$2f$laravehicles$2f$frontend$2f$node_modules$2f40$radix$2d$ui$2f$react$2d$toast$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Close"].displayName;
const ToastTitle = /*#__PURE__*/ __TURBOPACK__imported__module__$5b$project$5d2f$DEREK$2d$PROJECTS$2f$PERSONAL$2f$platzi$2f$nestjs$2f$laravehicles$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["forwardRef"](({ className, ...props }, ref)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$DEREK$2d$PROJECTS$2f$PERSONAL$2f$platzi$2f$nestjs$2f$laravehicles$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$DEREK$2d$PROJECTS$2f$PERSONAL$2f$platzi$2f$nestjs$2f$laravehicles$2f$frontend$2f$node_modules$2f40$radix$2d$ui$2f$react$2d$toast$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Title"], {
        ref: ref,
        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$DEREK$2d$PROJECTS$2f$PERSONAL$2f$platzi$2f$nestjs$2f$laravehicles$2f$frontend$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])("text-sm font-semibold", className),
        ...props
    }, void 0, false, {
        fileName: "[project]/DEREK-PROJECTS/PERSONAL/platzi/nestjs/laravehicles/frontend/components/ui/toaster.tsx",
        lineNumber: 96,
        columnNumber: 3
    }, ("TURBOPACK compile-time value", void 0)));
_c5 = ToastTitle;
ToastTitle.displayName = __TURBOPACK__imported__module__$5b$project$5d2f$DEREK$2d$PROJECTS$2f$PERSONAL$2f$platzi$2f$nestjs$2f$laravehicles$2f$frontend$2f$node_modules$2f40$radix$2d$ui$2f$react$2d$toast$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Title"].displayName;
const ToastDescription = /*#__PURE__*/ __TURBOPACK__imported__module__$5b$project$5d2f$DEREK$2d$PROJECTS$2f$PERSONAL$2f$platzi$2f$nestjs$2f$laravehicles$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["forwardRef"](({ className, ...props }, ref)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$DEREK$2d$PROJECTS$2f$PERSONAL$2f$platzi$2f$nestjs$2f$laravehicles$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$DEREK$2d$PROJECTS$2f$PERSONAL$2f$platzi$2f$nestjs$2f$laravehicles$2f$frontend$2f$node_modules$2f40$radix$2d$ui$2f$react$2d$toast$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Description"], {
        ref: ref,
        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$DEREK$2d$PROJECTS$2f$PERSONAL$2f$platzi$2f$nestjs$2f$laravehicles$2f$frontend$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])("text-sm opacity-90", className),
        ...props
    }, void 0, false, {
        fileName: "[project]/DEREK-PROJECTS/PERSONAL/platzi/nestjs/laravehicles/frontend/components/ui/toaster.tsx",
        lineNumber: 108,
        columnNumber: 3
    }, ("TURBOPACK compile-time value", void 0)));
_c6 = ToastDescription;
ToastDescription.displayName = __TURBOPACK__imported__module__$5b$project$5d2f$DEREK$2d$PROJECTS$2f$PERSONAL$2f$platzi$2f$nestjs$2f$laravehicles$2f$frontend$2f$node_modules$2f40$radix$2d$ui$2f$react$2d$toast$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Description"].displayName;
// Toast hook
const TOAST_LIMIT = 1;
const TOAST_REMOVE_DELAY = 1000000;
let count = 0;
function genId() {
    count = (count + 1) % Number.MAX_SAFE_INTEGER;
    return count.toString();
}
const toastTimeouts = new Map();
const addToRemoveQueue = (toastId)=>{
    if (toastTimeouts.has(toastId)) return;
    const timeout = setTimeout(()=>{
        toastTimeouts.delete(toastId);
        dispatch({
            type: "REMOVE_TOAST",
            toastId
        });
    }, TOAST_REMOVE_DELAY);
    toastTimeouts.set(toastId, timeout);
};
const reducer = (state, action)=>{
    switch(action.type){
        case "ADD_TOAST":
            return {
                ...state,
                toasts: [
                    action.toast,
                    ...state.toasts
                ].slice(0, TOAST_LIMIT)
            };
        case "UPDATE_TOAST":
            return {
                ...state,
                toasts: state.toasts.map((t)=>t.id === action.toast.id ? {
                        ...t,
                        ...action.toast
                    } : t)
            };
        case "DISMISS_TOAST":
            {
                const { toastId } = action;
                if (toastId) {
                    addToRemoveQueue(toastId);
                } else {
                    state.toasts.forEach((t)=>addToRemoveQueue(t.id));
                }
                return {
                    ...state,
                    toasts: state.toasts.map((t)=>t.id === toastId || toastId === undefined ? {
                            ...t,
                            open: false
                        } : t)
                };
            }
        case "REMOVE_TOAST":
            if (action.toastId === undefined) return {
                ...state,
                toasts: []
            };
            return {
                ...state,
                toasts: state.toasts.filter((t)=>t.id !== action.toastId)
            };
    }
};
const listeners = [];
let memoryState = {
    toasts: []
};
function dispatch(action) {
    memoryState = reducer(memoryState, action);
    listeners.forEach((listener)=>listener(memoryState));
}
function toast({ ...props }) {
    const id = genId();
    const update = (p)=>dispatch({
            type: "UPDATE_TOAST",
            toast: {
                ...p,
                id
            }
        });
    const dismiss = ()=>dispatch({
            type: "DISMISS_TOAST",
            toastId: id
        });
    dispatch({
        type: "ADD_TOAST",
        toast: {
            ...props,
            id,
            open: true,
            onOpenChange: (open)=>!open && dismiss()
        }
    });
    return {
        id,
        dismiss,
        update
    };
}
function useToast() {
    _s();
    const [state, setState] = __TURBOPACK__imported__module__$5b$project$5d2f$DEREK$2d$PROJECTS$2f$PERSONAL$2f$platzi$2f$nestjs$2f$laravehicles$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"](memoryState);
    __TURBOPACK__imported__module__$5b$project$5d2f$DEREK$2d$PROJECTS$2f$PERSONAL$2f$platzi$2f$nestjs$2f$laravehicles$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"]({
        "useToast.useEffect": ()=>{
            listeners.push(setState);
            return ({
                "useToast.useEffect": ()=>{
                    const index = listeners.indexOf(setState);
                    if (index > -1) listeners.splice(index, 1);
                }
            })["useToast.useEffect"];
        }
    }["useToast.useEffect"], [
        state
    ]);
    return {
        ...state,
        toast,
        dismiss: (toastId)=>dispatch({
                type: "DISMISS_TOAST",
                toastId
            })
    };
}
_s(useToast, "SPWE98mLGnlsnNfIwu/IAKTSZtk=");
function Toaster() {
    _s1();
    const { toasts } = useToast();
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$DEREK$2d$PROJECTS$2f$PERSONAL$2f$platzi$2f$nestjs$2f$laravehicles$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(ToastProvider, {
        children: [
            toasts.map(({ id, title, description, action, ...props })=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$DEREK$2d$PROJECTS$2f$PERSONAL$2f$platzi$2f$nestjs$2f$laravehicles$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Toast, {
                    ...props,
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$DEREK$2d$PROJECTS$2f$PERSONAL$2f$platzi$2f$nestjs$2f$laravehicles$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "grid gap-1",
                            children: [
                                title && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$DEREK$2d$PROJECTS$2f$PERSONAL$2f$platzi$2f$nestjs$2f$laravehicles$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(ToastTitle, {
                                    children: title
                                }, void 0, false, {
                                    fileName: "[project]/DEREK-PROJECTS/PERSONAL/platzi/nestjs/laravehicles/frontend/components/ui/toaster.tsx",
                                    lineNumber: 242,
                                    columnNumber: 23
                                }, this),
                                description && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$DEREK$2d$PROJECTS$2f$PERSONAL$2f$platzi$2f$nestjs$2f$laravehicles$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(ToastDescription, {
                                    children: description
                                }, void 0, false, {
                                    fileName: "[project]/DEREK-PROJECTS/PERSONAL/platzi/nestjs/laravehicles/frontend/components/ui/toaster.tsx",
                                    lineNumber: 243,
                                    columnNumber: 29
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/DEREK-PROJECTS/PERSONAL/platzi/nestjs/laravehicles/frontend/components/ui/toaster.tsx",
                            lineNumber: 241,
                            columnNumber: 11
                        }, this),
                        action,
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$DEREK$2d$PROJECTS$2f$PERSONAL$2f$platzi$2f$nestjs$2f$laravehicles$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(ToastClose, {}, void 0, false, {
                            fileName: "[project]/DEREK-PROJECTS/PERSONAL/platzi/nestjs/laravehicles/frontend/components/ui/toaster.tsx",
                            lineNumber: 246,
                            columnNumber: 11
                        }, this)
                    ]
                }, id, true, {
                    fileName: "[project]/DEREK-PROJECTS/PERSONAL/platzi/nestjs/laravehicles/frontend/components/ui/toaster.tsx",
                    lineNumber: 240,
                    columnNumber: 9
                }, this)),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$DEREK$2d$PROJECTS$2f$PERSONAL$2f$platzi$2f$nestjs$2f$laravehicles$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(ToastViewport, {}, void 0, false, {
                fileName: "[project]/DEREK-PROJECTS/PERSONAL/platzi/nestjs/laravehicles/frontend/components/ui/toaster.tsx",
                lineNumber: 249,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/DEREK-PROJECTS/PERSONAL/platzi/nestjs/laravehicles/frontend/components/ui/toaster.tsx",
        lineNumber: 238,
        columnNumber: 5
    }, this);
}
_s1(Toaster, "1YTCnXrq2qRowe0H/LBWLjtXoYc=", false, function() {
    return [
        useToast
    ];
});
_c7 = Toaster;
;
var _c, _c1, _c2, _c3, _c4, _c5, _c6, _c7;
__turbopack_context__.k.register(_c, "ToastViewport");
__turbopack_context__.k.register(_c1, "Toast");
__turbopack_context__.k.register(_c2, "ToastAction$React.forwardRef");
__turbopack_context__.k.register(_c3, "ToastAction");
__turbopack_context__.k.register(_c4, "ToastClose");
__turbopack_context__.k.register(_c5, "ToastTitle");
__turbopack_context__.k.register(_c6, "ToastDescription");
__turbopack_context__.k.register(_c7, "Toaster");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
]);

//# sourceMappingURL=DEREK-PROJECTS_PERSONAL_platzi_nestjs_laravehicles_frontend_fc2bd154._.js.map