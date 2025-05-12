# 第 10 届 CCPC 中国大学生程序设计竞赛郑州站

> 2025-05-11

最坐牢的一集，VP只写出了 B 题，其实通过人数最多的是 L 题来着。但就是没想出来，然后刚才看了一下，发现确实很简单。

其实现在想想，好像没有那么难，BL应该都不咋难，只要细心一点。我们做题时还是交流太少了感觉，虽然这场确实太难了。原本准备打浙江省赛的，但QOJ上一直在等待测评，不能VP。

[![pEXnN6g.png](https://s21.ax1x.com/2025/05/12/pEXnN6g.png)](https://imgse.com/i/pEXnN6g)

其他题目过段时间再回来补，最近没啥时间。

## B

其实就是枚举每个点的状态，然后弄一个bfs求最短距离。确实bfs就行，因为状态很少，我用的dijkstra，稍微写复杂了一点可能。但还是差不多。

像这种多个参数，最好写个自定义排序，这样省很多时间。`decltype`这个词老是忘记。这回应该记住了。

```cpp
#include<bits/stdc++.h>
using namespace std;

constexpr int INF = 1061109567;

int dis[110][210][5][5][5];

int main()
{
    ios::sync_with_stdio(false);
    cin.tie(nullptr), cout.tie(nullptr);
    int n;
    cin >> n;
    vector<vector<int>> a(n + 1, vector<int>(2 * n + 1));
    // vector<vector<int>> dis(n + 1, vector<int>(2 * n + 1, int(1e9)));
    
    for(int i = 1; i <= n; i++){
        for(int j = 1; j <= 2 * i - 1; j++){
            cin >> a[i][j];
        }
    }
    auto cmp = [&](array<int, 6> x, array<int, 6> y){
        return x[0] > y[0];
    };
    priority_queue<array<int, 6>,vector<array<int, 6>>, decltype(cmp)>pq(cmp);
    memset(dis, 0x3f, sizeof dis);
    // cout << dis[0][0][0][0][0] << '\n';
    dis[1][1][1][3][2] = 0;
    pq.push({0, 1, 1, 1, 3, 2});
    int sx, sy;
    cin >> sx >> sy;
    int ans = INF;
    while(!pq.empty()){
        auto [dist, i, j, left, right, mid] = pq.top();
        // cerr << i << " " << j << " " << dist <<" " <<mid<< '\n';
        pq.pop();
        if(i == sx && j == sy){
            ans = min(ans, dist);
        }
        if((j % 2 == 0) && (i - 1) > 0){
            if(mid == a[i - 1][j - 1] && dist + 1 < dis[i - 1][j - 1][left][right][a[i][j]]){
                dis[i - 1][j][left][right][a[i][j]] = dist + 1;
                pq.push({dist + 1, i - 1, j - 1, left, 
                    right, a[i][j]});
            }
        }
        if((j & 1) && (i + 1 <= n)){
            if(mid == a[i + 1][j + 1] && dist + 1 < dis[i + 1][j + 1][left][right][a[i][j]]){
                dis[i + 1][j + 1][left][right][a[i][j]] = dist + 1;
                pq.push({dist + 1, i + 1, j + 1, left, 
                    right, a[i][j]});
            }         
        }
        if(j - 1 > 0){
            // 向左走
            if(a[i][j - 1] == left){
                
                if(j & 1){ // 奇数列的
                    if(dis[i][j - 1][mid][a[i][j]][right] > dist + 1){
                        dis[i][j - 1][mid][a[i][j]][right] = dist + 1;
                        pq.push({dist + 1, i, j - 1, mid, a[i][j], right});
                    }
                }else{
                    if(dis[i][j - 1][mid][a[i][j]][right] > dist + 1){
                        dis[i][j - 1][mid][a[i][j]][right] = dist + 1;
                        pq.push({dist + 1, i, j - 1, mid, a[i][j], right});
                    }
                }
            }
        }
        if(j + 1 <= 2 * i - 1){
            if(a[i][j + 1] == right){
                if(j & 1){
                    if(dis[i][j + 1][a[i][j]][mid][left] > dist + 1){
                        dis[i][j + 1][a[i][j]][mid][left] = dist + 1;
                        pq.push({dist + 1, i, j + 1, a[i][j], mid, left});
                    }
                }else{
                    if(dis[i][j + 1][a[i][j]][mid][left] > dist + 1){
                        dis[i][j + 1][a[i][j]][mid][left] = dist + 1;
                        pq.push({dist + 1, i, j + 1, a[i][j], mid, left});
                    }
                }
            }
        }
    }
    // cout << "-1\n";
    cout << (ans == INF ? -1 : ans) << '\n';
    return 0;
}
```

## L

其实真挺签到的。。。比赛的时候想半天猜半天。。。

就是一个大的正方形会由四个小的正方形组成，我们的答案必然是使得 $L, R$ 在同一个正方形里，并且这个正方形是最小的。

```cpp
#include<bits/stdc++.h>
using namespace std;
using ll = long long;

void solve()
{
    ll l, r;
    cin >> l >> r;
    ll siz = 1;
    while(l / siz != r / siz)
        siz *= 2;
    cout << l % siz << '\n';
}
int main()
{
    ios::sync_with_stdio(false);
    cin.tie(nullptr), cout.tie(nullptr);
    int T = 1;
    cin >> T;
    while(T--)
        solve();
    return 0;
}
```