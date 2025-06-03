# ST表

> 2025-05-30

ST表(Sparse Table， 稀疏表) 可以实现 O(1) 查询区间 RMQ，线段树和树状数组查询 RMQ 是 O($\log n$) 的，但 ST 表是不支持修改的。

ST表是基于倍增思想，倍增也可以解决其他的问题，代码都跟 ST 表差不多，感觉非常神奇。

之前老是不太记得ST表怎么写，一般要用时会翻书看，用的次数也不是很多，但其实稍微理解下，就很容易记住了。

## [P3865 【模板】ST 表 && RMQ 问题](https://www.luogu.com.cn/problem/P3865)

才黄色难度。。。虽然确实一下就能学会。

数组会比 vector 快一些。

```cpp
#include<bits/stdc++.h>
using namespace std;

struct ST{
    vector<int> LOG2;
    vector<vector<int>> info;

    int op(int x, int y){
        return max(x, y);
    }
    ST(vector<int> &vec){
        // 1-index 
        int n = vec.size() - 1;
        LOG2.assign(n + 1, 0);
        // LOG2[1] = 0;
        for(int i = 2; i <= n; i++)
            LOG2[i] = LOG2[i >> 1] + 1;
        info.assign(n + 1, vector<int> (LOG2[n] + 1, 0));
        for(int i = 1; i <= n; i++){
            info[i][0] = vec[i];
        }
        for(int k = 1; k <= LOG2[n]; k++){
            for(int i = 1; i + (1 << k) <= n + 1; i++){
                info[i][k] = op(info[i][k - 1], info[i + (1 << (k - 1))][k - 1]);
            }
        }
    }
    int query(int l, int r){
        int k = LOG2[r - l + 1];
        return op(info[l][k], info[r - (1 << k) + 1][k]);
    }
};

int main()
{
    ios::sync_with_stdio(false), cin.tie(nullptr), cout.tie(nullptr);
    int n, q;
    cin >> n >> q;
    vector<int> a(n + 1);
    for(int i = 1; i <= n; i++)
        cin >> a[i];
    ST st(a);
    while(q--){
        int l, r;
        cin >> l >> r;
        cout << st.query(l, r) << "\n";
    }
    return 0;
}
```