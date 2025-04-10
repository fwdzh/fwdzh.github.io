存下用户代码片段之类的，不过现在是只用VSCode的。

## VSCODE

```json
{
	"ChatGptDeepSeek Template": {
		"prefix": "ChatGptDeepSeek",
		"body": [
			"#include <bits/stdc++.h>",
			"using namespace std;",
			"",
			"void ChatGptDeepSeek() // Date: ${CURRENT_YEAR}-${CURRENT_MONTH}-${CURRENT_DATE}",
			"{                      // Time: ${CURRENT_HOUR}:${CURRENT_MINUTE}:${CURRENT_SECOND} ",
			"    $0",
			"}",
			"",
			"int main()",
			"{",
			"    ios::sync_with_stdio(false);",
			"    cin.tie(nullptr);",
			"    cout.tie(nullptr);",
			"    int T = 1;",
			"    cin >> T;",
			"    while (T--)",
			"        ChatGptDeepSeek();",
			"    return 0;",
			"}"
		],
		"description": "Template for ChatGptDeepSeek function"
	},
	"Zhangwuji Template": {
		"prefix": "zwj",
		"body": [
			"// #define YUANSHEN",
			"#if defined(YUANSHEN)",
			// "#include \"C:/cp_code/template/debug.hpp\"",
			"#include \"/home/skadi/cp_code/template/debug.hpp\"",
			"#else",
			"#include <bits/stdc++.h>",
			"using namespace std;",
			"#define dbg(...) 42",
			"#endif",
			"template <typename T1, typename T2>",
			"void cmin(T1& x, const T2& y)",
			"{",
			"    x = x < y ? x : y;",
			"}",
			"template <typename T1, typename T2>",
			"void cmax(T1& x, const T2& y)",
			"{",
			"    x = x > y ? x : y;",
			"}",
			"using ll = long long;",
			"using ull = unsigned long long;",
			"using vi = vector<int>;",
			"using vl = vector<ll>;",
			"using pii = pair<int, int>;",
			"using pll = pair<ll, ll>;",
			"#define fixset(x) fixed << setprecision(x)",
			"#define fi first",
			"#define se second",
			"#define sz(x) (int)(x).size()",
			"#define all(x) (x).begin(), (x).end()",
			"#define ALL(x) (x).begin() + 1, (x).end()",
			"constexpr int INF = 1000000000;",
			"constexpr ll LNF = 1000000000000000000LL;",
			"",
			"void ChatGptDeepSeek() // Date: ${CURRENT_YEAR}-${CURRENT_MONTH}-${CURRENT_DATE}",
			"{                      // Time: ${CURRENT_HOUR}:${CURRENT_MINUTE}:${CURRENT_SECOND} ",
			"    $0",
			"}",
			"",
			"int main()",
			"{",
			"#ifndef YUANSHEN",
			"    ios::sync_with_stdio(false);",
			"    cin.tie(0);",
			"    cout.tie(0);",
			"#endif",
			"    int T = 1;",
			"    cin >> T;",
			"    while (T--)",
			"        ChatGptDeepSeek();",
			"    return 0;",
			"}"
		],
		"description": ""
	},
	"Fast Exponentiation": {
        "prefix": "ksm",
        "body": [
            "ll ksm(ll a, ll b) {",
            "    ll res = 1;",
            "    while (b) {",
            "        if (b & 1)",
            "            res = res * a % mod;",
            "        a = a * a % mod;",
            "        b >>= 1;",
            "    }",
            "    return res;",
            "}"
        ],
        "description": "快速幂 (Exponentiation by Squaring)"
    }
}
```