# 第 49 届 ICPC 国际大学生程序设计竞赛邀请赛武汉站

> 2025-04-20
>
> 去年其实VP过一次，但是没啥写的，而且也想再试下这个。也还行吧，第四个其实想不到也正常，看了题解。

B 去年居然为WA了 3 个小时。。。且最后也没对，现在看来确实只是个位运算的很简单的题目。

## B

简单来说就是构造 $n$ 个非负整数，使得它们的和为 $sum$ ，且按位或的值最小，简单的贪心一下就好了。还是有一点点细节要注意的，这次还WA了两次，去年也是这里。

```cpp
#include <bits/stdc++.h>
using namespace std;
using ll = long long;

int main()
{
    ios::sync_with_stdio(false);
    cin.tie(nullptr);
    cout.tie(nullptr);
    int n;
    cin >> n;
    ll sum = 0;
    for (int i = 1; i <= n; i++)
    {
        int x;
        cin >> x;
        sum += x;
    }
    // cerr<<(1LL<<30);
    // cerr << sum << '\n';
    ll res = 0;
    for (int i = 30; i >= 0; i--)
    {
        ll val = ((1LL << i) - 1) * n;
        if (val >= sum)
            continue;
        if (sum >= (1LL << i) * n)
            sum -= (1LL << i) * n;
        else
            sum %= (1LL << i);
        res |= 1LL << i;
    } // 1001
    cout << res << '\n';
    return 0;
}
```

## F

二分那个数字的值，没问题，但是再怎么搞呢？我倒是看出来了前 $k$ 小的数会被圈在右上角。且每列的长度是小于等于左边一列的长度，每行也是类似的，但是没想到这个怎么处理。

若是再对每行进行二分，则总共需要 $n\log n \log n^2$ 次操作，显然不太行。

没想到阿，题解里它是假设开始是 $r,c$ 位置，若 $\le x$ ，则检查 $r,c+1$ ，否则检查 $r-1,c$ ，则总次数最多 $2n\log n^2$ ，刚好够用。

```cpp
#include <bits/stdc++.h>
using namespace std;
using ll = long long;

int main()
{
    ios::sync_with_stdio(false);
    cin.tie(nullptr);
    cout.tie(nullptr);
    int n,k;
    cin>>n>>k;
    k=n*n-k+1;
    auto ask=[&](int i,int j,int x){
        cout<<"? "<<i<<" "<<j<<" "<<x<<endl;
        int res; cin >> res;
        return res;
    };
    auto check=[&](int x){
        int r=n,c=1,cnt=0;
        while(r>0&&c<=n){
            if(ask(r,c,x)) cnt+=r,c++;
            else r--;
        }
        return cnt>=k;
    };
    int lo=0,hi=n*n+1;
    while(lo<hi-1){
        int mid=(lo+hi)>>1;
        if(check(mid)) hi=mid;
        else lo=mid;
        // cerr<<lo<<" "<<hi<<endl;
    }
    cout<<"! "<<hi<<endl;
    return 0;
}
```

## I

简单找规律

```cpp
#include<bits/stdc++.h>
using namespace std;
using ll = long long;
 
int main()
{
    ios::sync_with_stdio(false);
    cin.tie(nullptr);
    cout.tie(nullptr);
    string s;
    cin>>s;
    int cnt=0;
    if(s[0]=='1') cnt++;
    for(int i=1;i<s.size();i++){
        if(s[i]=='1'&&s[i-1]=='0')  cnt++;
    }
    if(cnt==0) cout<<cnt<<'\n';
    else if(s.back()=='1') cout<<cnt-1<<'\n';
    else cout<<cnt<<'\n';
    return 0;
}
```

## K

打表看看就知道了。

```cpp
#include<bits/stdc++.h>
using namespace std;
using ll = long long;

constexpr int N = int(1e6);
int s[N+1];

void solve()
{
    int n;
    cin>>n;
    // cerr<<s[n]<<" ";
    if(s[n]==0) cout<<"Pinkie Pie\n";
    else if(s[n]==1||s[n]==n) cout<<"Fluttershy\n";
    else if(s[n]==n+1) cout<<"Pinkie Pie\n";
}
/*
1 2 3 4 5 ,1


*/
int main()
{
    // ios::sync_with_stdio(false);
    // cin.tie(nullptr);
    // cout.tie(nullptr);
    for(int i=1;i<=N;i++){
        
        s[i]=i^s[i-1];
        // cerr<<i<<" "<<s[i]<< '\n';
    }
    int T;
    cin>>T;
    while(T--)
        solve();
    return 0;
}
```