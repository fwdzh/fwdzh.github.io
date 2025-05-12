# 第二届包子杯

> 2025-05-11

gym: https://codeforces.com/gym/105883

A 和 K 之后再来补。

## E

挺简单的， 直接模拟就行， 但是要分解质因子， 只分解因子是会超时的， 质因子数量很少， 大概 $\log n$， 不能嫌麻烦， 一下就写完了。

```cpp
#include<bits/stdc++.h>
using namespace std;
using pii = pair<int, int>;
using ll = long long;

constexpr int N = int(5e5) + 5;
vector<set<pii>>st(N);

int minp[N + 1];

void solve()
{
    int n;
    cin >> n;
    auto Ins = [&](int x, int y){
        auto it = st[x].lower_bound({y, -1});
        if(it == st[x].end() || (*it).first != y)
            st[x].insert({y, 1});
        else{
            auto [u, v] = *it;
            st[x].erase(it);
            st[x].insert({y, v + 1});
        }
    };
    auto Del = [&](int x, int y){
        auto it = st[x].lower_bound({y, -1});
        auto [u, v] = *it;
        st[x].erase(it);
        if(v - 1)
            st[x].insert({y, v - 1});
    };
    while(n--){
        char op;
        cin >> op;
        if(op == '+'){
            int x, y;
            cin >> x >> y;
            while(x != 1){
                int p = minp[x];
                while(x % p == 0)
                    x /= p;
                Ins(p, y);
            }
        }else if(op == '-'){
            int x, y;
            cin >> x >> y;
            while(x != 1){
                int p = minp[x];
                while(x % p == 0)
                    x /= p;
                Del(p, y);
            }
        }else{
            int k;
            cin >> k;
            int ans = 0;
            while(k != 1){
                int p = minp[k];
                while(k % p == 0)
                    k /= p;
                if(st[p].size())
                    ans = max(ans, (*st[p].rbegin()).first);
            }
            cout << ans << '\n';
        }
    }
}
int main()
{
    ios::sync_with_stdio(false);
    cin.tie(nullptr), cout.tie(nullptr);
    for(int i = 2; i <= N; i++){
        if(minp[i]) continue;
        minp[i] = i;
        if((ll)i * i > N) continue;
        for(int j = i * i; j <= N; j += i)
            minp[j] = i;
    }
    int T = 1;
    // cin >> T;
    while(T--)
        solve();
    return 0;
}
```

## G

感觉思路非常简单， 也确实非常简单， 但是我们一直 WA， WA麻了。。。然后换 py 照着重写但是过了。。。刚才看了下才发现， 是因为我没有记清楚 `long long` 和 `unsigned long long` 的范围。。。

$n$ 的上界是 $2^{64} - 1$， 所以最多会有 $64$ 位， 我们可以进行 $63$ 次询问， 那肯定一位位顺着问。 我们只问 $2 ^ i$ 的值， 如果 $n$ 的这一位为 $1$， 那么结果肯定会是实际的 $1$ 的数量减一， 否则就是加一。

所以我们把高的 $63$ 位都问完， 如果 $n$ 这 $63$ 位里有 $0$ 且有 $1$， 那么这 $63$ 次询问的结果一定只有两种值， 且它们相差 $2$。 否则这些位肯定全 $0$ 或者全 $1$， 这些需要特判一下， 注意 $64$ 位全 $1$ 是 `ULLONG_MAX`  我们这里之前本来改过，，，后来又怀疑自己了。

然后我们问完之后就可以确定前 $63$ 位的情况了， 最后一位我们只需要看我们已经填了的 $1$ 的数量是否等于 $n$ 的 $1$ 的数量。

py 其实也不是很熟，，，这个stdout.flush() 我不知道得 import 啥， 然后搜了一下才知道。 这回知道了。

```py
import sys

for _ in range(int(input())):
    cnt = [0] * 64

    for i in range(1, 64):
        print("?", pow(2,i))
        sys.stdout.flush()
        cnt[i] = int(input())

    mx = 0
    mn = 64

    for i in range(1, 64):
        mx = max(mx, cnt[i])
        mn = min(mn, cnt[i])

    ans = 0

    if(mx == mn):
        if mx == 1:
            ans = 0
        elif mx == 2:
            ans = 1
        else:
            ans = pow(2, 64) - 1
    
    else:
        tnc = 0
        for i in range(1, 64):
            if cnt[i] == mn:
                tnc += 1
                ans += pow(2, i)
        
        if tnc != mn + 1:
            ans += 1
    
    print("!", ans)
    sys.stdout.flush()
```

然后比赛时我都怀疑自己编译器有问题了。。。 因为我写 for 循环， 如果只有一行我就不喜欢打括号， 然后当时写一个 for 循环， 忘记删括号了。

```cpp
#include<bits/stdc++.h>
using namespace std;
using pii = pair<int, int>;
using ll = long long;
using ull = unsigned long long;

int ask(ull x)
{
    cout << "? " << x << endl;
    cout.flush();
    int res;
    cin >> res;
    return res;
}

void solve()
{
    ull ans = 0;
    vector<int> cnt(64);
    for(int i = 63; i >= 1; i--){
        cnt[i] = ask(1ull << i);
    }
    int mx = *max_element(cnt.begin() + 1, cnt.end());
    int mn = *min_element(cnt.begin() + 1, cnt.end());
    
    if(mx == mn){
        if(mx == 1) ans = 0;
        else if(mx == 2) ans = 1; 
        else ans = ULLONG_MAX;
    }else{
        int tnc = 0;
        for(int i = 63; i >= 1; i--){
            if(cnt[i] == mn){
                tnc++;
                ans |= 1ull << i;
            }
        }
        if(tnc != mn + 1) ans |= 1, tnc++;
        assert(tnc == mx - 1);
    }
    cout << "! " << ans << endl;
    cout.flush();
}
int main()
{
    ios::sync_with_stdio(false);
    cin.tie(nullptr), cout.tie(nullptr);
    int T = 1;
    cin >> T;
    while(T--){
        solve();
    }
    return 0;
}
```

## H

第一道 AC 的题， 但是四十多分钟才AC 且 WA两次， 虽然难度不高。 队友想出来的， 太强。

感觉我构造太菜， 不过这种只要不着急慢慢试， 基本都能试出来的， 影响的只是时间， 如果写得太慢， 会没有状态和时间写后面的题目。

构造方法有很多。

```cpp
#include<bits/stdc++.h>
using namespace std;

void solve()
{
    int n;
    cin >> n;
    if(n == 2){
        cout << "-1\n";
        return;
    }
    if(n == 4){
        cout << "3 4 1 2\n";
        return;
    }
    if(n & 1){
        for(int i = n; i > n / 2 + 1; i--){
            cout << i << " ";
        }
        cout << 1 << ' ';
        for(int i = 2; i <= n / 2 + 1; i++)
            cout << i <<  " ";
        cout << '\n';
    }else{
        cout << n << " " << n / 2 << ' ';
        for(int i = 1; i < n / 2; i++)
            cout << i << " ";
        for(int i = n - 1; i > n / 2; i--)
            cout << i << " ";
        cout << "\n";
    }
}
int main()
{
    ios::sync_with_stdio(false);
    cin.tie(nullptr), cout.tie(nullptr);
    int T;
    cin >> T;
    while(T--)
        solve();
    return 0;
}
```

## I

出题人以为的签到题， 但最后只有几个队提交了。 群友还是都太强了...

虽然刚才看了下， 感觉最难的是推出那个公式， 就是知道正方形的两个对角线的顶点的坐标， 怎么求剩下的两个顶点的坐标。。。最智慧的一集。

一个点绕一个点旋转 $90$ 度的话， 新的坐标其实是可以求出来的。而且这个题这里， 也可以用向量来求。

知道正方形两个对角的顶点 $(x1, y1)$， $(x2, y2)$， 那么剩下两个点的坐标就是 $(\frac{x1+x2}{2}-\frac{y1-y2}{2},\frac{y1+y2}{2}+\frac{x1-x2}{2})$ 和 $(\frac{x1+x2}{2}+\frac{y1-y2}{2},\frac{y1+y2}{2}-\frac{x1-x2}{2})$ 。

比赛其实我们也没怎么读这题， 因为确实没啥人开。

```cpp
#include<bits/stdc++.h>
using namespace std;
using pii = pair<int, int>;
#define fi first
#define se second

void solve()
{
    // 只用枚举主对角线的两个点
    int n;
    cin >> n;
    vector<pii> p(n);
    for(int i = 0; i < n; i++)
        cin >> p[i].first >> p[i].second;
    map<pii, int>mp;
    for(int i = 0; i < n; i++){
        mp[p[i]] = i;
    }
    int ans = 0;
    vector<int> cnt(n);
    for(int i = 0; i < n; i++){
        auto [x1, y1] = p[i];
        for(int j = i + 1; j < n; j++){
            auto [x2, y2] = p[j];
            int x3 = (x1 + x2) - (y1 - y2);
            int y3 = (y1 + y2) + (x1 - x2);
            int x4 = (x1 + x2) + (y1 - y2);
            int y4 = (y1 + y2) - (x1 - x2);
            if((x3 & 1) || (y3 & 1) || (x4 & 1) || (y4 & 1)) continue;
            x3 /= 2, y3 /= 2, x4 /= 2, y4 /= 2;
            if(mp.contains({x3, y3}) && mp.contains({x4, y4})){
                // cerr << format("{}, {}, {}, {}", x1, y1, x2, y2) << '\n';
                cnt[i]++, cnt[j]++;
                cnt[mp[{x3, y3}]]++, cnt[mp[{x4, y4}]]++;
                ans++;
            }
        }
    }
    // cerr << ans << '\n';
    // for(int i = 0; i < n; i++)
    //     cerr << format("{}", cnt[i]) << " \n"[i + 1 == n];
    cout << (ans - *min_element(cnt.begin(), cnt.end())) / 2 << '\n';
}
int main()
{
    // freopen("1.in", "r", stdin);
    ios::sync_with_stdio(false);
    cin.tie(nullptr), cout.tie(nullptr);
    int T;
    cin >> T;
    while(T--)
        solve();
    return 0;
}
```

## J

挺简单， 具有单调性， 可以二分， 查区间最大值， 只能去最大值的地方。

也可以单调栈 $O(n)$ 写。 我刚开始真直接写线段树查区间最值来着。。。 但这题两个 log 会 T， 然后改成 ST 表过了。。。 不写 ST 表是因为平常没咋用过不熟， 线段树写得比较熟。。。 像这种也是得练练。

```cpp
#include<bits/stdc++.h>
using namespace std;

#define ls p << 1
#define rs p << 1 | 1
#define mi ((l + r) >> 1)

constexpr int N = int(1e6) + 10;
int a[N], n, ST[N][25];
void init()
{
    int p = log2(n);
    for(int i = 1; i <= n; i++)
        ST[i][0] = a[i];
    for(int k = 1; k <= p; k++){
        for(int s = 1; s + (1 << k) <= n + 1; s++){
            ST[s][k] = max(ST[s][k - 1], ST[s + (1 << (k - 1))][k - 1]);
        }
    } 
}
int query(int L, int R)
{
    int k = __lg(R - L + 1);
    return max(ST[L][k], ST[R - (1 << k) + 1][k]);
}
// tr[N << 2];
// void build(int p, int l, int r)
// {
//     if(l == r){
//         tr[p] = a[l];
//         return;
//     }
//     build(ls, l, mi);
//     build(rs, mi + 1, r);
//     tr[p] = max(tr[ls], tr[rs]);
// }
// int query(int p, int l, int r, int lx, int rx)
// {
//     if(l >= lx && r <= rx)
//         return tr[p];
//     int res = 0;
//     if(lx <= mi) res = max(res, query(ls, l, mi, lx, rx));
//     if(rx > mi) res = max(res, query(rs, mi + 1, r, lx, rx));
//     return res;
// }


void solve()
{
    // int n;
    cin >> n;
    vector<int> idx(n + 1);
    for(int i = 1; i <= n; i++)
        a[i] = i;
    // shuffle(a + 1, a + 1 + n);
    for(int i = 1; i <= n; i++){
        cin >> a[i];
        idx[a[i]] = i;
    }
    // build(1, 1, n);
    init();
    if(n == 1){
        cout << "0\n";
        return;
    }
    int lo = 0, hi = n + 1;
    auto check = [&](int d){
        vector<bool> ok(n + 1);
        for(int i = idx[n]; i >= idx[n] - d && i >= 1; i--)
            ok[a[i]] = true;
        for(int i = idx[n]; i <= idx[n] + d && i <= n; i++)
            ok[a[i]] = true;
        for(int i = idx[n] - d - 1; i >= 1; i--){
            // int num = query(1, 1, n, max(i - d, 1), min(n, i + d));
            int num = query(max(i - d, 1), min(n, i + d));
            if(!ok[num]) return false;
            ok[a[i]] = true;
        }
        for(int i = idx[n] + d + 1; i <= n; i++){
            // int num = query(1, 1, n, max(i - d, 1), min(n, i + d));
            int num = query(max(i - d, 1), min(n, i + d));
            if(!ok[num]) return false;
            ok[a[i]] = true;
        }
        return true;
    };
    // check(1);
    while(lo < hi - 1){
        int mid = (lo + hi) >> 1;
        if(check(mid)) hi = mid;
        else lo = mid;
    }
    cout << hi << '\n';
}
int main()
{
    ios::sync_with_stdio(false);
    cin.tie(nullptr), cout.tie(nullptr);
    int T;
    cin >> T;
    while(T--)
        solve();
    return 0;
}
```