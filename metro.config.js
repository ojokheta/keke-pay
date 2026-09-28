const fs = require("fs");
const path = require("path");
const { getDefaultConfig } = require("expo/metro-config");
const { withNativeWind } = require("nativewind/metro");

const config = getDefaultConfig(__dirname);
const withCss = withNativeWind(config, { input: "./global.css" });
const previousResolve = withCss.resolver.resolveRequest;

withCss.resolver.resolveRequest = (context, moduleName, platform) => {
  if (moduleName.startsWith("semver/")) {
    const filePath = path.resolve(__dirname, "node_modules", `${moduleName}.js`);
    if (fs.existsSync(filePath)) {
      return { filePath, type: "sourceFile" };
    }
  }

  if (previousResolve) {
    return previousResolve(context, moduleName, platform);
  }

  return context.resolveRequest(context, moduleName, platform);
};

module.exports = withCss;
