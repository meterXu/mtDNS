print(
'''
===========================================\n
DNS自动解析\n
===========================================\n
开源地址: https://github.com/meterXu/mtDNS\n
===========================================\n
\n
'''
)

# 读入 AccessKeyId, AccessKeySecret, 主域名,子域名个数
akid = input('AccessKeyId: ')
aks  = input('AccessKeySecret: ')
domain_name = input('主域名 (例: domain.com , 不要带子域名!!!) : ')
num = input('子域名个数 (>=1) : ')
print('\n')

# 初始化
final_write = "\n" + "{\n" + "    \"gobal\": {\n" + "        \"apiAddress\": \"https://alidns.aliyuncs.com\",\n" + "        \"ipaddressUrl\": \"http://www.yxxrui.cn/yxxrui_cabangs_api/myip.ashx\",\n" + "        \"AccessKeyId\": \"" + akid + "\",\n" + "        \"AccessKeySecret\": \"" + aks +"\",\n" + "        \"DomainName\": \"" + domain_name + "\"\n" + "    },\n" + "   \"param\":[\n"

# 循环添加子域名
for i in range(0,int(num)) :
    www = input('子域名 (例: www) : ')
    if i == int(int(num)-1) :
        final_write +=  "       {\n" + "            \"RRKeyWord\": \"" + www + "\",\n" + "          \"Type\":\"A\",\n" + "          \"Priority\":1\n" + "       }\n"
    else :
        final_write +=  "       {\n" + "           \"RRKeyWord\": \"" + www + "\",\n" + "           \"Type\":\"A\",\n" + "          \"Priority\":1\n" + "       },\n"

# 添加尾部
final_write += "    ]\n}"

# 写入文件
f = open('config.json','w')
f.write(final_write)
