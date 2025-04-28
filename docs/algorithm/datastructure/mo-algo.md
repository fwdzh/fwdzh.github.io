# 莫队算法

> 2025-04-28

莫队算法是一种处理区间询问的离线算法， 通过分块可以达到 $n \sqrt{n} $ 的时间复杂度。

最基础的莫队算法是， 把长度为 $n$ 的区间， 分成大小为 $\sqrt{n}$ 的块， 然后把询问的 $[l,r]$ 先按照 $l$ 所在的块的位置排序， 再按 $r$ 的大小排序。

我们定义 $L, R$ 用来记录当前维护的答案的区间， 只需要根据当前需要查询的区间动态地去移动 $L$ 和 $R$ 。 所以要使用莫队，需要保证能从 $[l, r]$ 的贡献推出 $[l, r+1]$ 的贡献。

莫队也算是一种暴力的算法， 但是时间复杂度却可以做到 $n \sqrt{n} $ 。在一个块内， $L$ 最多只会移动 $\sqrt {n} \sqrt{n}$ 次， $R$ 最多只会移动 $\sqrt{n}$ 次，而总共只有 $\sqrt{n}$ 块，所以总体操作的次数最多会是 $n\sqrt{n} + n$ 次。

## 普通的

基本会是比较板的，直接写就行。

### [P2709 小B的询问](https://www.luogu.com.cn/problem/P2709)

比较模板的题，不需要做什么改变。

```cpp
struct node {
    int l, r, idx;
};
void ChatGptDeepSeek() // Date: 2025-04-25
{ // Time: 15:33:26
    int n, m, k;
    cin >> n >> m >> k;
    vi a(n + 1), c(k + 1), ans(m), pos(n + 1);
    int siz = sqrt(n);
    for (int i = 1; i <= n; i++)
        cin >> a[i], pos[i] = i / siz;
    vector<node> Q(m);
    for (int i = 0; i < m; i++)
        cin >> Q[i].l >> Q[i].r, Q[i].idx = i;
    sort(all(Q), [&](node x, node y) {
        return (pos[x.l] == pos[y.l]) ? (x.r < y.r) : (pos[x.l] < pos[y.l]);
    });
    int L = 1, R = 0;
    ll res = 0;
    auto add = [&](int i) {
        assert(i > 0 && i <= n);
        res -= (ll)c[a[i]] * c[a[i]];
        c[a[i]]++;
        res += (ll)c[a[i]] * c[a[i]];
    };
    auto sub = [&](int i) {
        assert(i > 0 && i <= n);
        res -= (ll)c[a[i]] * c[a[i]];
        c[a[i]]--;
        res += (ll)c[a[i]] * c[a[i]];
    };
    
    for (int i = 0; i < m; i++) {
        auto [l, r, idx] = Q[i];
        while(L > l) add(--L);
        while(R < r) add(++R);
        while(L < l) sub(L++);
        while(R > r) sub(R--);
        // cerr << L << " " << R << '\n';
        ans[idx] = res;
    }
    for(int i = 0; i < m; i++)
        cout << ans[i] << "\n";
}
```

### [CF86D](https://codeforces.com/contest/86/problem/D)

做 CF 按 AC 数排序的第一题， 然后感觉不会， 一看题解说要用莫队。 就是从这开始想着要学一下莫队的。

也是只涉及基本的操作的一题。

但是这题也有些帮助， 用 vector 装结构体的提交是 `2062ms` ， 仅仅把 vector 换成数组， 时间就变成了 `1280ms` ， 在数据量较大的情况下， 差异还是挺大的。

```cpp
constexpr int N = int(1e6)+5;
int cnt[N];
struct node{
    int l, r, idx;
};
node Q[N];
void ChatGptDeepSeek() // Date: 2025-04-25
{                      // Time: 21:27:09 
    int n, q;
    cin >> n >> q;
    vi a(n + 1), pos(n + 1);
    vl ans(q + 1);
    int siz = sqrt(n);
    for(int i = 1; i <= n; i++)
        cin >> a[i], pos[i] = i / siz;
    // vector<node>Q(q);
    for(int i = 0; i < q; i++){
        cin >> Q[i].l >> Q[i].r;
        Q[i].idx = i;
    }
    sort(Q, Q + q, [&](node x, node y){
        return (pos[x.l] == pos[y.l]) ? (x.r < y.r) : (pos[x.l] < pos[y.l]);
    });
    // sort(all(Q), [&](node x, node y){
    //     return (pos[x.l] == pos[y.l]) ? (x.r < y.r) : (pos[x.l] < pos[y.l]);
    // });
    ll res = 0;
    auto add = [&](int i){
        res -= (ll)cnt[a[i]] * cnt[a[i]] * a[i];
        cnt[a[i]]++;
        res += (ll)cnt[a[i]] * cnt[a[i]] * a[i];
    };
    auto sub = [&](int i){
        res -= (ll)cnt[a[i]] * cnt[a[i]] * a[i];
        cnt[a[i]]--;
        res += (ll)cnt[a[i]] * cnt[a[i]] * a[i];
    };
    int L = 1, R = 0;
    for(int i = 0; i < q; i++){
        auto [l, r, idx] = Q[i];
        while(L > l) add(--L);
        while(R < r) add(++R);
        while(L < l) sub(L++);
        while(R > r) sub(R--);
        ans[idx] = res;
    }
    for(int i = 0; i < q; i++)
        cout << ans[i] << "\n";
}
```

### [P1494 [国家集训队] 小 Z 的袜子](https://www.luogu.com.cn/problem/P1494)

比较板的题。 `std::format` 真好用hhh， 不过得 C++ 20 才能用。
求一下区间的取到两个相同数字的方式的数量，和总数量取一下 gcd 就行。

```cpp
constexpr int N = int(5e4)+5;
struct node{
    int l, r, idx;
};
node Q[N];
void ChatGptDeepSeek() // Date: 2025-04-26
{                      // Time: 00:48:12 
    /*
    洛谷P1494
    询问区间的抽到两个相同数字的概率
    */
    int n, m;
    cin >> n >> m;
    int siz = sqrt(n);
    vi c(n + 1), pos(n + 1), cnt(n + 1);
    for(int i = 1; i <= n; i++)
        cin >> c[i], pos[i] = i / siz;
    for(int i = 0; i < m; i++){
        cin >> Q[i].l >> Q[i].r;
        Q[i].idx = i;
    }
    sort(Q, Q + m, [&](node x, node y){
        return (pos[x.l] == pos[y.l]) ? (x.r < y.r) : (pos[x.l] < pos[y.l]);
    });
    ll res = 0;
    auto add = [&](int i){
        res -= (ll)cnt[c[i]] * (cnt[c[i]] - 1) / 2;
        cnt[c[i]]++;
        res += (ll)cnt[c[i]] * (cnt[c[i]] - 1) / 2;
    };
    auto sub = [&](int i){
        res -= (ll)cnt[c[i]] * (cnt[c[i]] - 1) / 2;
        cnt[c[i]]--;
        res += (ll)cnt[c[i]] * (cnt[c[i]] - 1) / 2;
    };
    int L = 1, R = 0;
    vector<string> ans(m);
    for(int i = 0; i < m; i++){
        auto [l, r, idx] = Q[i];
        while(L > l) add(--L);
        while(R < r) add(++R);
        while(L < l) sub(L++);
        while(R > r) sub(R--);
        ll X = (ll)(R - L + 1) * (R - L) / 2;
        ll g = __gcd(X, res);
        // cout << res / g << "/" << X / g << '\n';
        if(g == 0) ans[idx] = "0/1";
        else
            ans[idx] = format("{}/{}",res/g,X/g);
    }
    for(int i = 0; i < m; i++)
        cout << ans[i] << '\n';
}
```

### [P4462 [CQOI2018] 异或序列](https://www.luogu.com.cn/problem/P4462)

这题没想出来， 还是挺有细节的。

查询的区间 $[l, r]$ 直接给处理成 $[l - 1, r] $， 查询区间 $[l, r]$ 的值其实是问是否存在 $[l-1, r]$ 之间的两个前缀使得 $s_x \oplus s_y = k$ 。

加减也是需要注意一些东西。

```cpp
struct node{
    int l, r, idx;
};
node Q[100001];
int cnt[200002];
void ChatGptDeepSeek() // Date: 2025-04-26
{                      // Time: 20:37:22 
    int n, m, k;
    cin >> n >> m >> k;
    int siz = sqrt(n);
    vector<int> a(n + 1), pos(n + 1), pre(n + 1);
    vl ans(m);
    for(int i = 1; i <= n; i++){
        cin >> a[i];
        pre[i] = pre[i - 1] ^ a[i];
        pos[i] = i / siz;
    }
    for(int i = 0; i < m; i++){
        cin >> Q[i].l >> Q[i].r;
        Q[i].idx = i;
    }
    sort(Q, Q + m, [&](node x, node y){
        return (pos[x.l] == pos[y.l]) ? (x.r < y.r) : (pos[x.l] < pos[y.l]);
    });
    ll res = 0;
    auto add = [&](int i){
        res += cnt[pre[i] ^ k];
        cnt[pre[i]]++;
    };
    auto sub = [&](int i){
        cnt[pre[i]]--;
        res -= cnt[pre[i] ^ k];
    };
    cnt[0] = 1;
    int L = 0, R = 0;
    for(int i = 0; i < m; i++){
        auto [l, r, idx] = Q[i];
        --l;
        while(L > l) add(--L);
        while(R < r) add(++R);
        while(L < l) sub(L++);
        while(R > r) sub(R--);
        ans[idx] = res;
    }
    for(int i = 0; i < m; i++)
        cout << ans[i] << '\n';
}
```

## 带修莫队

带修莫队目前只写了一题， 后面会更新。

如果是带修的莫队， 一般会先按 $l$ 的块的顺序排， 再按 $r$ 的顺序排， 再按 $t$ 的大小来排， $t$ 表示的是前面的修改的次数， 块的大小一般选择 $\sqrt[3]{n^2}$ , 也就是 $n^{\frac{2}{3}}$ , 即 pow(n, 0.67) 。 

### [P1903 [国家集训队] 数颜色 / 维护队列](https://www.luogu.com.cn/problem/P1903)

因为 $t$ 的大小会不同， 我们还需要取消操作， 其实就是记一下进行每次修改时， 那个格子是什么颜色， 取消修改就是给它颜色还原回去嘛。

当时 color 那个数组大小我开错了， 找了半天， 还是让 deepseek 帮我看的。 我当时是把那个数组的大小开成了查询次数的。

```cpp
struct node{
    int l, r, t, idx;
};
node Q[133333];
int cnt[int(1e6)+1];

void ChatGptDeepSeek() // Date: 2025-04-26
{                      // Time: 01:16:57 
    int n, m;
    cin >> n >> m;
    vi c(n + 1), pos(n + 1);
    int siz = pow(n, 0.67) + 1;
    for(int i = 1; i <= n; i++)
        cin >> c[i], pos[i] = i / siz;
    vector<pii> upd;
    int tot = 0;
    for(int i = 0, cnt = 0; i < m; i++){
        char op;
        int x, y;
        cin >> op >> x >> y;
        if(op == 'R') upd.push_back({x, y}), cnt++;
        else Q[tot++] = {x, y, cnt, tot-1};
    }
    if(!tot) return;
    sort(Q, Q + tot, [&](node x, node y){
        if(pos[x.l] == pos[y.l]){
            if(pos[x.r] == pos[y.r]) return x.t < y.t;
            return pos[x.r] < pos[y.r];
        }
        return pos[x.l] < pos[y.l];
    });
    vi ans(tot), color(sz(upd));
    int L = 1, R = 0, T = 0, res = 0;
    auto add = [&](int i){
        cnt[c[i]]++;
        if(cnt[c[i]] == 1) res++;
    };
    auto sub = [&](int i){
        cnt[c[i]]--;
        if(cnt[c[i]] == 0) res--;
    };
    auto change = [&](int t){
        auto [P, C] = upd[t];
        color[t] = c[P];
        if(P >= L && P <= R){
            cnt[c[P]]--;
            if(cnt[c[P]] == 0) res--;
            cnt[C]++;
            if(cnt[C] == 1) res++;
        }
        c[P] = C;
    };
    auto recover = [&](int t){
        auto [P, C] = upd[t];
        c[P] = color[t];
        if(P >= L && P <= R){
            cnt[C]--;
            if(cnt[C] == 0) res--;
            cnt[c[P]]++;
            if(cnt[c[P]] == 1) res++;
        }
    };
    for(int i = 0; i < tot; i++){
        auto [l, r, t, idx] = Q[i];
        while(L > l) add(--L);
        while(R < r) add(++R);
        while(L < l) sub(L++);
        while(R > r) sub(R--);
        while(T < t) change(T++);
        while(T > t) recover(--T);
        ans[idx] = res;
    }
    for(int i = 0; i < tot; i++)
        cout << ans[i] << '\n';
}
```