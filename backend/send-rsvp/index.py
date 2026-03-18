import json
import os
import smtplib
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart


def handler(event: dict, context) -> dict:
    """Принимает ответы анкеты гостя и отправляет их на почту hajta498@gmail.com"""

    if event.get('httpMethod') == 'OPTIONS':
        return {
            'statusCode': 200,
            'headers': {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
                'Access-Control-Allow-Headers': 'Content-Type, X-User-Id, X-Auth-Token, X-Session-Id',
                'Access-Control-Max-Age': '86400',
            },
            'body': ''
        }

    body = json.loads(event.get('body') or '{}')

    name = body.get('name', '—')
    phone = body.get('phone', '—')
    attendance = body.get('attendance', '—')
    guests = body.get('guests', '—')
    food = body.get('food', '—')
    alcohol = body.get('alcohol', [])
    if isinstance(alcohol, list):
        alcohol_str = ', '.join(alcohol) if alcohol else '—'
    else:
        alcohol_str = str(alcohol)
    transfer = body.get('transfer', '—')
    track = body.get('track', '—')
    wish = body.get('wish', '—')
    children_count = body.get('childrenCount', '—')
    children_ages = body.get('childrenAges', '—')

    html = f"""
    <html>
    <body style="font-family: Arial, sans-serif; color: #1a3535; background: #f4fafa; padding: 20px;">
      <div style="max-width: 600px; margin: 0 auto; background: #fff; border-radius: 16px; overflow: hidden; box-shadow: 0 4px 24px rgba(0,0,0,0.08);">
        <div style="background: linear-gradient(135deg, #3aacac, #1a5276); padding: 32px 32px 24px; text-align: center;">
          <div style="font-size: 2rem;">♥</div>
          <h1 style="color: #fff; font-size: 1.5rem; margin: 8px 0 4px; font-weight: 400;">Новая анкета гостя</h1>
          <p style="color: rgba(255,255,255,0.8); margin: 0; font-size: 0.9rem;">Свадьба Дениса &amp; Анастасии · 08.07.2026</p>
        </div>
        <div style="padding: 28px 32px;">
          <table style="width: 100%; border-collapse: collapse;">
            <tr style="border-bottom: 1px solid #e0f3f3;">
              <td style="padding: 12px 0; color: #456868; font-size: 0.85rem; width: 45%;">Имя и фамилия</td>
              <td style="padding: 12px 0; font-weight: 600;">{name}</td>
            </tr>
            <tr style="border-bottom: 1px solid #e0f3f3;">
              <td style="padding: 12px 0; color: #456868; font-size: 0.85rem;">Телефон</td>
              <td style="padding: 12px 0; font-weight: 600;">{phone}</td>
            </tr>
            <tr style="border-bottom: 1px solid #e0f3f3;">
              <td style="padding: 12px 0; color: #456868; font-size: 0.85rem;">Присутствие</td>
              <td style="padding: 12px 0; font-weight: 600; color: #3aacac;">{attendance}</td>
            </tr>
            <tr style="border-bottom: 1px solid #e0f3f3;">
              <td style="padding: 12px 0; color: #456868; font-size: 0.85rem;">Кол-во гостей</td>
              <td style="padding: 12px 0; font-weight: 600;">{guests}</td>
            </tr>
            <tr style="border-bottom: 1px solid #e0f3f3;">
              <td style="padding: 12px 0; color: #456868; font-size: 0.85rem;">Дети (кол-во)</td>
              <td style="padding: 12px 0; font-weight: 600;">{children_count}</td>
            </tr>
            <tr style="border-bottom: 1px solid #e0f3f3;">
              <td style="padding: 12px 0; color: #456868; font-size: 0.85rem;">Возраст детей</td>
              <td style="padding: 12px 0; font-weight: 600;">{children_ages}</td>
            </tr>
            <tr style="border-bottom: 1px solid #e0f3f3;">
              <td style="padding: 12px 0; color: #456868; font-size: 0.85rem;">Меню</td>
              <td style="padding: 12px 0; font-weight: 600;">{food}</td>
            </tr>
            <tr style="border-bottom: 1px solid #e0f3f3;">
              <td style="padding: 12px 0; color: #456868; font-size: 0.85rem;">Алкоголь</td>
              <td style="padding: 12px 0; font-weight: 600;">{alcohol_str}</td>
            </tr>
            <tr style="border-bottom: 1px solid #e0f3f3;">
              <td style="padding: 12px 0; color: #456868; font-size: 0.85rem;">Трансфер</td>
              <td style="padding: 12px 0; font-weight: 600;">{transfer}</td>
            </tr>
            <tr style="border-bottom: 1px solid #e0f3f3;">
              <td style="padding: 12px 0; color: #456868; font-size: 0.85rem;">Любимый трек</td>
              <td style="padding: 12px 0; font-weight: 600;">{track}</td>
            </tr>
            <tr>
              <td style="padding: 12px 0; color: #456868; font-size: 0.85rem; vertical-align: top;">Пожелания</td>
              <td style="padding: 12px 0; font-weight: 600; line-height: 1.6;">{wish}</td>
            </tr>
          </table>
        </div>
        <div style="background: #e0f3f3; padding: 16px 32px; text-align: center; font-size: 0.8rem; color: #456868;">
          Это письмо отправлено автоматически с сайта свадьбы ♡
        </div>
      </div>
    </body>
    </html>
    """

    smtp_password = os.environ.get('SMTP_PASSWORD', '')
    sender = 'hajta498@gmail.com'
    recipient = 'hajta498@gmail.com'

    msg = MIMEMultipart('alternative')
    msg['Subject'] = f'💌 Анкета гостя: {name} — Свадьба Дениса & Анастасии'
    msg['From'] = sender
    msg['To'] = recipient
    msg.attach(MIMEText(html, 'html', 'utf-8'))

    with smtplib.SMTP_SSL('smtp.gmail.com', 465) as server:
        server.login(sender, smtp_password)
        server.sendmail(sender, recipient, msg.as_string())

    return {
        'statusCode': 200,
        'headers': {'Access-Control-Allow-Origin': '*'},
        'body': json.dumps({'ok': True})
    }
