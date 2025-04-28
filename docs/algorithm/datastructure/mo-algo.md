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

